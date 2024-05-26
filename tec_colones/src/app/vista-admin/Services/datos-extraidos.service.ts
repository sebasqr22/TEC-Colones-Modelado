import {Injectable, OnInit} from '@angular/core';
import {DatabaseService} from "../Services/database.service";

@Injectable({
  providedIn: 'root'
})
export class DatosExtraidosService{

  public centros_acopio = {};

  // FUNCIONES GENERALES:

  private parsear(datos:Object){
    return JSON.stringify(JSON.parse(<string>datos))
  }

  async cargarCentros() {
    try {
      const value = await this.base.get('centros');
      return JSON.parse(JSON.stringify(value)); // Retorna los datos procesados
    } catch (error) {
      console.error('Error al cargar los centros de acopio:', error);
      throw error; // Re-lanza el error para que pueda ser manejado por el llamador si es necesario
    }
  }




  // SETEO DE DATOS
  async setCentros() {
    try {
      this.centros_acopio = await this.cargarCentros();
    } catch (error) {
      console.error('Error al obtener los centros de acopio:', error);
    }
  }



  // EXTRACCION DE DATOS
  getCentros(){
    return this.centros_acopio;
  }


  constructor(private base: DatabaseService) {
    this.setCentros();
  }

}
