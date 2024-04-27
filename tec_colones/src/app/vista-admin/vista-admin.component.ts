import { Component } from '@angular/core';

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})
export class VistaAdminComponent {

  generarMaterial(){
    const nombre = document.getElementById("nombreCrearMaterial") as HTMLSelectElement;
    const unidad = document.getElementById("unidadCrearMaterial") as HTMLSelectElement;
    const valor_unitario = document.getElementById("valorUnitarioCrearMaterial") as HTMLSelectElement;
    const estado = document.getElementById("estadoCrearMaterial") as HTMLSelectElement;
    const descrpcion = document.getElementById("descripcionCrearMaterial") as HTMLSelectElement;
  }
}
