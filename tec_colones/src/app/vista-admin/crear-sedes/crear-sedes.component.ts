import { Component, ViewChildren, Renderer2, ElementRef, QueryList, OnInit } from '@angular/core';
import {DatabaseService} from "../database.service";
import {ElementosPantallaService} from "../elementos-pantalla.service";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-sedes',
  templateUrl: './crear-sedes.component.html',
  styleUrls: ['./crear-sedes.component.css']
})
export class CrearSedesComponent {
  form = this.fb.group({
    nombre: ['', Validators.required],
    provincia:['', Validators.required],
    telefono:['', Validators.required]
  });


  crearSede(){
    let primary;
    if (this.form.valid) {
      primary = this.base.generateCode('S');

      const info = {
        pk: primary,
        ...this.form.value,
        estado: 'activo',
        fechaHora: this.base.getDateTime()
      };

      console.log(info);
      this.base.escribirDatos('sedes/' + primary, info, this.form);

    } else {
      alert("Existen Datos Inválidos!!!")
    }
  }


  constructor(private base: DatabaseService, private fb: FormBuilder) {
  }
}
