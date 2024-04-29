import { Component, ViewChildren, Renderer2, ElementRef, QueryList, OnInit } from '@angular/core';
import {DatabaseService} from "../database.service";
import {ElementosPantallaService} from "../elementos-pantalla.service";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})
export class VistaAdminComponent {
  //VARIABLES ----------------------------------------------------------------------------------------------------------

  busqueda = true;
  @ViewChildren('cambio_color') elementos: QueryList<ElementRef> | undefined;
  generarMaterial = this.fb.group({
    nombre: ['', Validators.required],
    unidad: ['', Validators.required],
    valorUnitario: ['', Validators.required],
    estado: ['', Validators.required],
    descripcion: ['', Validators.required]
  });


  pantallas = ['crearMaterial'];
  pantallaActual = 'crearMaterial';

  elementosPantalla = this.elementosP.getElementos();
  miembrosActuales = ['crearMaterial', 'crearMateriali', 'materiales'];


  //colores

  encendido = 'white';
  apagado = '#6c757d';

  //VARIABLES ----------------------------------------------------------------------------------------------------------

  actualizarMiembros(pantalla:string){
    this.miembrosActuales.forEach(miembro => {
      const elemento = document.getElementById(miembro);
      console.log(elemento);
      // @ts-ignore
      elemento.style.color = this.apagado;
    }) //apagar miembros antiguios


    // @ts-ignore
    this.miembrosActuales = this.elementosPantalla['admin'][pantalla];
    this.miembrosActuales.forEach(miembro => {
      const elemento = document.getElementById(miembro);
      console.log(elemento);
      // @ts-ignore
      elemento.style.color = this.encendido;
    }) //encender miembros nuevos
  }


  cambiarPantalla(pantalla:string){
    let actual = document.getElementById(this.pantallaActual);
    // @ts-ignore
    actual.style.display = 'none';

    this.pantallaActual = pantalla;
    actual = document.getElementById(this.pantallaActual);
    // @ts-ignore
    actual.style.display = 'block';

    this.actualizarMiembros(pantalla);
  }

  crearMaterial() {
    let primary;
    if (this.generarMaterial.valid) {
      primary = this.base.generateCode()

      const info = {
        pk: primary,
        ...this.generarMaterial.value,
        fechaHora: this.base.getDateTime()
      };

      console.log(info);
      this.base.escribirDatos('material/' + primary, info, this.generarMaterial);

    } else {
      alert("Existen Datos Inválidos!!!")
    }

  }

  pantallaBusqueda(){
    this.busqueda = !this.busqueda;
    const todo = document.getElementById('todo');
    if(this.busqueda){
      // @ts-ignore
      todo.className = '';
    }
    else{
      // @ts-ignore
      todo.className = 'sb-sidenav-toggled';
    }
  }


  cambiarColor(color:string) {
    // @ts-ignore
    this.elementos.forEach(elemento => {
      this.renderer.setStyle(elemento.nativeElement, 'color', color);
    });
  }




  constructor(private base: DatabaseService, private fb: FormBuilder, private renderer: Renderer2,
              private elementosP:ElementosPantallaService){}


  // FUNCIONES INICIALES------------------------------------------------------------------------------------------------
  esconderTodas(){
    let actual ;
    this.pantallas.forEach(pantalla => {
      actual = document.getElementById(pantalla);
      // @ts-ignore
      actual.style.display = 'none';
    })
    actual = document.getElementById(this.pantallaActual);
    // @ts-ignore
    actual.style.display = 'block';
  }


  actualizarEncendidos(){
    this.miembrosActuales.forEach(miembro => {
      const ele = document.getElementById(miembro);
      // @ts-ignore
      ele.style.color = this.encendido;
    })
  }

  ngOnInit():void{
    this.esconderTodas();
    this.actualizarEncendidos();
  }


  // FUNCIONES INICIALES------------------------------------------------------------------------------------------------
}
