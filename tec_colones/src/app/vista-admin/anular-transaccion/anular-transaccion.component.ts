import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "../database.service";
import {AbstractControl, FormBuilder, ValidationErrors, Validators, ɵElement, ɵValue, FormControl} from "@angular/forms";
import {FechaHoraService} from "../fecha-hora.service";
import {LlaveService} from "../llave.service";

@Component({
  selector: 'app-anular-transaccion',
  templateUrl: './anular-transaccion.component.html',
  styleUrls: ['./anular-transaccion.component.css']
})
export class AnularTransaccionComponent implements OnInit {
  form = this.fb.group({
    transaccion: ['', Validators.required],
    sede: ['', Validators.required],
    centro: ['', Validators.required],
    carnet: ['', Validators.required],
    material: ['', Validators.required],
    fecha: ['', Validators.required],
    funcionario: ['', Validators.required],
  })

  transacciones = [];
  claves: string[] = [];
  transaccion_seleccionada = [];
  carnet_seleccionado = "";
  fecha_seleccionada = '';



  iterarJson_objetos(data: JSON) {
    let nuevo_json = {};
    for (let clave in data) {
      if (data.hasOwnProperty(clave)) {
        // @ts-ignore
        const elemento = data[clave];

        // @ts-ignore
        nuevo_json[clave] = elemento;
        // @ts-ignore
        this.transacciones.push(nuevo_json);
      }
    }
  }
  iterarJson_CENTRO(data: JSON) {
    for (let clave in data) {
      if (data.hasOwnProperty(clave)) {
        // @ts-ignore
        const elemento = data[clave];
        this.iterarJson_objetos(elemento);
      }
    }
  }
  iterarJson_SEDE(data: JSON) {
    for (let clave in data) {
      if (data.hasOwnProperty(clave)) {
        // @ts-ignore
        const elemento = data[clave];
        this.iterarJson_CENTRO(elemento);
      }
    }
  }


  guardarClaves(){
    for (let clave in this.transacciones) {
      if (this.transacciones.hasOwnProperty(clave)) {
        const elemento = this.transacciones[clave];
        for (let primero in elemento) {
          // @ts-ignore
          if (elemento.hasOwnProperty(primero)) {
            const x = elemento[primero];
            this.claves.push(primero);
          }
        }
      }
    }
  }


  get_trasacciones() {
    console.log("get_trasacciones");
    this.base.get('transaccion/global').then((value => {
      this.iterarJson_SEDE(value);
      console.log(this.transacciones);
      this.guardarClaves();
    }));
  }

  get_Informacion_Seleccionado(clave_buscar: ɵValue<ɵElement<(string | ((control: AbstractControl) => (ValidationErrors | null)))[], null>> | undefined){
    for (let clave in this.transacciones) {
      if (this.transacciones.hasOwnProperty(clave)) {
        const elemento = this.transacciones[clave];
        for (let primero in elemento) {
          // @ts-ignore
          if (elemento.hasOwnProperty(primero)) {
            if(primero == clave_buscar){
              return elemento[primero];
            }
          }
        }
      }
    }
  }

  buscarRutaHistorial(){

    // @ts-ignore
    this.base.get(`historial/${this.carnet_seleccionado}`).then((value => {
      for (let clave in value) {
        console.log("lista");
        console.log(clave);
        if (value.hasOwnProperty(clave)) {
          // @ts-ignore
          const elemento = data[clave];
          if(elemento[0]['fechaHora'] == this.fecha_seleccionada){
            return clave;
          }
        }
      }
    }));
    return "";
  }

  escribirRespaldo(){
    const codigo = this.llave.generateCode('A');
    let datos = {
      ...this.transaccion_seleccionada,
      pk: codigo
    };
    this.base.escribirDatos(`respaldo/${codigo}`, datos, this.form);
  }

  anular(){
    this.base.borrarDatos(`transaccion/global/${this.transaccion_seleccionada[0]['sede']['pk']}/${this.transaccion_seleccionada[0]['centro']['pk']}/${this.form.value.transaccion}`, this.form);
    this.base.borrarDatos(`historial/${this.carnet_seleccionado}/${this.buscarRutaHistorial()}`, this.form);
    this.escribirRespaldo();
    this.get_trasacciones();
  }

  cambiarInfo(){
    let array = this.get_Informacion_Seleccionado(this.form.value.transaccion);
    // @ts-ignore
    this.transaccion_seleccionada = array;
    let materiales = "";
    // @ts-ignore
    for (let i = 0; i < array.length; i++) {
      // @ts-ignore
      this.form.controls['sede'].setValue(array[i]['sede']['nombre']);
      // @ts-ignore
      this.form.controls['centro'].setValue(array[i]['centro']['codigo']);
      // @ts-ignore
      this.carnet_seleccionado = array[i]['carnet'];
      // @ts-ignore
      this.form.controls['carnet'].setValue(array[i]['carnet']);
      // @ts-ignore
      this.fecha_seleccionada = array[i]['fechaHora'];
      // @ts-ignore
      this.form.controls['fecha'].setValue(array[i]['fechaHora']);
      // @ts-ignore
      this.form.controls['funcionario'].setValue('No Especifica');
      // @ts-ignore
      materiales += `${array[i]['material']['nombre']} \t --- \t valor: ₡${Number(array[i]['material']['valorUnitario']) * Number(array[i]['cantidad'])}\n`;
    }
    // @ts-ignore
    this.form.controls['material'].setValue(materiales);
  }

  constructor(private base: DatabaseService, private fb: FormBuilder,
              private fechaHora: FechaHoraService,
              private llave: LlaveService) {
  }

  ngOnInit() {
    this.get_trasacciones();
  }
}
