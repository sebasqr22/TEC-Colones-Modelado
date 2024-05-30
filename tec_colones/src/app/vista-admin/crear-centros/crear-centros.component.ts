import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {DatabaseService} from "../database.service";
import {FechaHoraService} from "../fecha-hora.service";
import {LlaveService} from "../llave.service";
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-crear-centros',
  templateUrl: './crear-centros.component.html',
  styleUrls: ['./crear-centros.component.css']
})
export class CrearCentrosComponent implements OnInit{
  form = this.fb.group({
    telefono: ['', Validators.required],
    sede:[''],
    ubicacion:['', Validators.required],
    codigo:['', Validators.required]
  });

  datos = [];
  valorSeleccionado: any;

  codigoRepetido = false;

  async verificarExistenciaDeCodigo(verificador:string):Promise<void>{
    let listaCodigos: string[] = [];

    this.base.get('centros').then((value => {
      const elementos = JSON.parse(JSON.stringify(value));
      for (let clave in elementos) {
        if (elementos.hasOwnProperty(clave)) {
          const elemento = elementos[clave];
          listaCodigos.push(elemento.pk);
        }
      }

      console.log(listaCodigos.includes(verificador));
      if(listaCodigos.includes(verificador)){
        this.codigoRepetido = true;
      }

    }));
  }


    crearCentro() {
     console.log(this.form.value);
     let primary;
     if (this.form.valid) {
       primary = this.form.value.codigo;

       // @ts-ignore
       this.verificarExistenciaDeCodigo(primary);

         const info = {
           pk: primary,
           ...this.form.value,
           estado: 'activo',
           fechaHora: this.fechaHora.getDateTime()
         };

         console.log(info);
         this.base.escribirDatos('centros/' + primary, info, this.form);

     } else {
       alert("Existen Datos Inválidos!!!");
     }
   }


  constructor(private base: DatabaseService, private fb: FormBuilder,
              private fechaHora:FechaHoraService,
              private llave:LlaveService) {}

  ngOnInit(){

    this.base.get('sedes').then((value => {
      const elementos = JSON.parse(JSON.stringify(value));
      for (let clave in elementos) {
        if (elementos.hasOwnProperty(clave)) {
          const elemento = elementos[clave];
          const liste = elemento;
          // @ts-ignore
          this.datos.push(elemento);
        }
      }
      console.log(this.datos);

    }));
  }

}
