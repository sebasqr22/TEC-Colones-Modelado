import { Component, ViewChildren, Renderer2, ElementRef, QueryList, OnInit } from '@angular/core';
import {DatabaseService} from "../database.service";
import {ElementosPantallaService} from "../elementos-pantalla.service";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-crear-materiales',
  templateUrl: './crear-materiales.component.html',
  styleUrls: ['./crear-materiales.component.css']
})
export class CrearMaterialesComponent {
  generarMaterial = this.fb.group({
    nombre: ['', Validators.required],
    unidad: ['', Validators.required],
    valorUnitario: ['', Validators.required],
    estado: ['', Validators.required],
    descripcion: ['', Validators.required]
  });


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


  constructor(private base: DatabaseService, private fb: FormBuilder, private renderer: Renderer2,
              private elementosP:ElementosPantallaService){}
}
