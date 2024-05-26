import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "../Services/database.service";
import {DatosExtraidosService} from "../Services/datos-extraidos.service";

@Component({
  selector: 'app-ver-centros',
  templateUrl: './ver-centros.component.html',
  styleUrls: ['./ver-centros.component.css']
})
export class VerCentrosComponent implements OnInit{
  private centros_de_acopio = {};

  editarMaterial(){
    console.log("editar");
  }

  crearTh(padre: HTMLTableRowElement, info: string) {
    const th = document.createElement('td');
    th.innerText = String(info);
    padre.appendChild(th);
  }

  crearFila(contador: number, json: JSON){
    console.log(json);
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.innerText = String(contador);
    th.scope = 'row';
    tr.appendChild(th);
    // @ts-ignore
    this.crearTh(tr, json['pk']);
    // @ts-ignore
    this.crearTh(tr, json['estado']);
    // @ts-ignore
    this.crearTh(tr, json['telefono']);
    // @ts-ignore
    this.crearTh(tr, json['ubicacion']);
    // @ts-ignore
    this.crearTh(tr, json['sede'].nombre);
    // @ts-ignore
    this.crearTh(tr, json['sede'].pk);
    // @ts-ignore
    this.crearTh(tr, json['fechaHora']);


    const th2 = document.createElement('td');
    const boton = document.createElement('button');
    boton.className = 'fa-solid fa-pen-to-square'; // Agregar la clase del icono aquí

// Agrega un evento de clic al botón
    boton.addEventListener('click', () => {
      this.editarMaterial();
    });

    th2.appendChild(boton);
    th2.scope = 'row';
    tr.appendChild(th2);



    return tr;
  }

  cargarCentros() {
    const tabla = document.getElementById('body-tabla');
    let contador = 1;
    for (let clave in this.centros_de_acopio) {
      if (this.centros_de_acopio.hasOwnProperty(clave)) {
        
        //@ts-ignore
        const elemento = this.centros_de_acopio[clave];

        //@ts-ignore
        tabla.appendChild(this.crearFila(contador, elemento));
        contador++;
      }
    }

  }

  constructor(private base: DatabaseService, private datos_extraidos:DatosExtraidosService) {
  }

  ngOnInit() {
    this.centros_de_acopio = this.datos_extraidos.getCentros();
    console.log(this.centros_de_acopio);
    this.cargarCentros();
  }
}
