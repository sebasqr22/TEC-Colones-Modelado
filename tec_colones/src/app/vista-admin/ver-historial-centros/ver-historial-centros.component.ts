import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "../database.service";
import {FormBuilder, Validators} from "@angular/forms";
import {FechaHoraService} from "../fecha-hora.service";
import {LlaveService} from "../llave.service";

@Component({
  selector: 'app-ver-historial-centros',
  templateUrl: './ver-historial-centros.component.html',
  styleUrls: ['./ver-historial-centros.component.css']
})
export class VerHistorialCentrosComponent implements OnInit {
  form = this.fb.group({
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required],
    centro: ['', Validators.required]
  })

  centros_json = {};
  centros = [];
  materialesTexto = "";

  transacciones = [];
  trans_aux = [];
  centro = "";

  constructor(private base: DatabaseService, private fb: FormBuilder,
              private fechaHora: FechaHoraService,
              private llave: LlaveService) {
  }


  get_centros() {
    this.base.get('centros').then((value => {
      const elementos = JSON.parse(JSON.stringify(value));
      this.centros_json = elementos;
      for (let clave in elementos) {
        if (elementos.hasOwnProperty(clave)) {
          const elemento = elementos[clave];
          // @ts-ignore
          this.centros.push(elemento);
        }
      }
      //this.cambiarCentros(this.sedes[0]["nombre"]);
    }));
  }

  get_trasacciones() {
    this.base.get('historial').then((value => {
      const elementos = JSON.parse(JSON.stringify(value));
      for (let clave in elementos) {
        if (elementos.hasOwnProperty(clave)) {
          const elemento = elementos[clave];
          // @ts-ignore
          this.transacciones.push(elemento);
        }
      }
    }));
  }

  splitByLength(str: string, length: number): string[] {
    let result: string[] = [];
    for (let i = 0; i < str.length; i += length) {
      result.push(str.substring(i, i + length));
    }
    return result;
  }

  rangoFecha(fecha: Date, fechaInicio: Date, fechaFin: Date): boolean {
    return fecha >= fechaInicio && fecha <= fechaFin;
  }

  validaInformacionVacia(){
    if(this.materialesTexto == ""){
      alert("No se encontró información...")
    }
  }

  recorrerJsonDentro(objeto:JSON){
    // @ts-ignore
    const inicio:Date = new Date(this.form.value.fechaInicio);
    // @ts-ignore
    const final:Date = new Date(this.form.value.fechaFin);

    let contador = 0;

    for (let clave in objeto) {
      if (objeto.hasOwnProperty(clave)) {
        // @ts-ignore
        const elemento = objeto[clave];
        const fecha:Date = new Date(elemento.fechaHora);


        if(this.rangoFecha(fecha, inicio, final) && elemento.centro.pk == this.centro){
          this.materialesTexto += `Carnet: ${elemento.carnet} \t\t\t ${elemento.material.nombre} \t\t\t ₡${Number(elemento.material.valorUnitario) * Number(elemento.cantidad)}\t\t\t ${elemento.fechaHora}\n`
          contador ++;
        }

      }
    }
    this.validaInformacionVacia();

  }

  recorrerJson(objeto:JSON){
    for (let clave in objeto) {
      if (objeto.hasOwnProperty(clave)) {
        // @ts-ignore
        const elemento = objeto[clave];

        this.recorrerJsonDentro(elemento);

      }

    }
  }


  buscarTransacciones() {
    this.materialesTexto = "";
    if (this.form.valid) {
      // @ts-ignore
      this.centro = this.form.value.centro.pk;
      for (let clave in this.transacciones) {
        if (this.transacciones.hasOwnProperty(clave)) {
          const elemento = this.transacciones[clave];
          this.recorrerJson(elemento);


        }
      }
    } else {
      alert("Existen datos invalidos...")
    }
  }

  ngOnInit() {
    this.get_centros();
    this.get_trasacciones();
  }
}
