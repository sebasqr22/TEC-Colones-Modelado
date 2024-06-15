import { Injectable } from '@angular/core';
import {DatabaseService} from "./database.service";

@Injectable({
  providedIn: 'root'
})
export class LlaveService {

  private readonly characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  llaves:any[] = [];

  validarExistentes(identificador:string){

    let iden = "";

    switch (identificador){
      case 'S':
        iden = 'sedes';
        break;

      case 'M':
        iden = 'material'
        break;

      case 'R':
        iden = 'registros'
        break;

      case 'T':
        iden = 'asignaciones'
        break;

      default:
        break;
    }

    this.llaves = [];

    this.base.get(iden).then((value => {
      const elementos = JSON.parse(JSON.stringify(value));
      for (let clave in elementos) {
        if (elementos.hasOwnProperty(clave)) {
          const elemento = elementos[clave];
          // @ts-ignore
          this.llaves.push(elemento.pk);
        }
      }
    }));
  }

  generateCode(llave:string): string {
    const length = 12;
    let result = '';
    const charactersLength = this.characters.length;

    this.validarExistentes(llave);

    while (true) {
      for (let i = 0; i < length; i++) {
        result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      if (!this.llaves.includes(result)) {
        break;
      }
    }

    return llave + '-' + result;
  }

  constructor(private base: DatabaseService) { }
}
