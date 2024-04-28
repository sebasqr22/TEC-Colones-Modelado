import { Component, ViewChildren, Renderer2, ElementRef, QueryList, OnInit } from '@angular/core';
import {DatabaseService} from "../database.service";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})
export class VistaAdminComponent {
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

  cambiarPantalla(pantalla:string){
    let actual = document.getElementById(this.pantallaActual);
    // @ts-ignore
    actual.style.display = 'none';

    this.pantallaActual = pantalla;
    actual = document.getElementById(this.pantallaActual);
    // @ts-ignore
    actual.style.display = 'block';
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




  constructor(private base: DatabaseService, private fb: FormBuilder, private renderer: Renderer2){}

  ngOnInit():void{
    this.esconderTodas();
  }
}
