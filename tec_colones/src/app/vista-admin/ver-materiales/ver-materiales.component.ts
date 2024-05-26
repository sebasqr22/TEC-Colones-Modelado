import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "../Services/database.service";

@Component({
  selector: 'app-ver-materiales',
  templateUrl: './ver-materiales.component.html',
  styleUrls: ['./ver-materiales.component.css']
})
export class VerMaterialesComponent {

  editarMaterial(){
    console.log("editar");
  }

  crearTh(padre: HTMLTableRowElement, info: string) {
    const th = document.createElement('td');
    th.innerText = String(info);
    padre.appendChild(th);
  }

  crearFila(contador: number, json: JSON) {
    console.log(json);
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.innerText = String(contador);
    th.scope = 'row';
    tr.appendChild(th);
    // @ts-ignore
    this.crearTh(tr, json['nombre']);
    // @ts-ignore
    this.crearTh(tr, json['pk']);
    // @ts-ignore
    this.crearTh(tr, json['unidad']);
    // @ts-ignore
    this.crearTh(tr, json['valorUnitario']);
    // @ts-ignore
    this.crearTh(tr, json['estado']);
    // @ts-ignore
    this.crearTh(tr, json['descripcion']);
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

  cargarMateriales() {
    const tabla = document.getElementById('body-tabla');
    this.base.get('material').then((value => {
      const elementos = JSON.parse(JSON.stringify(value));
      let contador = 1;
      for (let clave in elementos) {
        if (elementos.hasOwnProperty(clave)) {
          const elemento = elementos[clave];

          // @ts-ignore
          tabla.appendChild(this.crearFila(contador, elemento));
          contador++;
        }
      }

    }));
  }

  constructor(private base: DatabaseService) {
  }

  ngOnInit() {
    this.cargarMateriales();
  }
}
