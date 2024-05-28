import { Component } from '@angular/core';
import {DatabaseService} from "../database.service";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})
export class VistaAdminComponent {
  generarMaterial = this.fb.group({
    nombre: ['', Validators.required],
    unidad: ['', Validators.required],
    valorUnitario: ['', Validators.required],
    estado: ['', Validators.required],
    descripcion: ['', Validators.required]
  });
  crearMaterial(){
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


  constructor(private base: DatabaseService, private fb: FormBuilder){
  }
}
