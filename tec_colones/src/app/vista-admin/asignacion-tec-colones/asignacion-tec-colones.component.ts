import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "../database.service";
import {FormBuilder, Validators} from "@angular/forms";
import {FechaHoraService} from "../fecha-hora.service";
import {LlaveService} from "../llave.service";

@Component({
  selector: 'app-asignacion-tec-colones',
  templateUrl: './asignacion-tec-colones.component.html',
  styleUrls: ['./asignacion-tec-colones.component.css']
})
export class AsignacionTecColonesComponent implements OnInit{
  protected sedes = [];
  private centros_json = [];
  protected centros = [];
  protected centros_aux = [];
  protected materiales = [];


  private listdo = [];
  materialesTexto: string = '';
  private pk = "";

  form = this.fb.group({
    sede:['', Validators.required],
    centro:['', Validators.required],
    carnet:['', Validators.required],
    material:['', Validators.required],
    cantidad:['', Validators.required]
  })

  cambiarCentros(){
    const sede = this.form.value.sede;
    this.centros_aux = [];
    let valor: string | null | undefined = "";

    // @ts-ignore
    valor = sede["nombre"];



    for (let clave in this.centros_json) {
      if (this.centros_json.hasOwnProperty(clave)) {
        const elemento = this.centros_json[clave];
        if(elemento['sede']['nombre'] == valor){
          this.centros_aux.push(elemento);
        }
      }
    }
  }

  // FUNCIONES GET--------------------------------------------------------------------------------------------------

  get_sedes(){
    this.base.get('sedes').then((value => {
      const elementos = JSON.parse(JSON.stringify(value));
      for (let clave in elementos) {
        if (elementos.hasOwnProperty(clave)) {
          const elemento = elementos[clave];
          // @ts-ignore
          this.sedes.push(elemento);
        }
      }
    }));
  }

  get_centros(){
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

  get_materiales(){
    this.base.get('material').then((value => {
      const elementos = JSON.parse(JSON.stringify(value));
      for (let clave in elementos) {
        if (elementos.hasOwnProperty(clave)) {
          const elemento = elementos[clave];

          if(elemento.estado == "activo"){
            // @ts-ignore
            this.materiales.push(elemento);
          }


        }
      }
    }));
  }


  //----------------------------------------------------------------------------------------------------------------


  agregarMaterial(){
    const valores = this.form.value;
    if(this.form.valid){
      const nuevo = {
        ...valores,
        fechaHora: this.fechaHora.getDateTime()
      };
      //this.base.escribirDatos(`historial/${valores.carnet}`, nuevo, this.form);
      // @ts-ignore
      this.listdo.push(nuevo);
      // @ts-ignore
      this.pk = this.form.value.carnet;
      // @ts-ignore
      this.materialesTexto += `${valores.material["nombre"]} \t --- \t valor: ₡${valores.material["valorUnitario"] * Number(valores.cantidad)}\n`
      this.form.patchValue({
        material: '',
        cantidad: ''
      });
    }
    else{
      alert("Datos Inválidos...")
    }
  }

  recorrerJsonDentro(objeto: JSON) {
    console.log("SE VIENEN COSITAS:")
    console.log(objeto);
  }

  recorrerJson(objeto: JSON) {
    for (let clave in objeto) {
      if (objeto.hasOwnProperty(clave)) {
        // @ts-ignore
        const elemento = objeto[clave];
        this.recorrerJsonDentro(elemento);
      }
    }
  }

  generarRegistro(data: JSON) {
    let centro = {};
    let sede = {};
    let json_nuevo = {};

    for (let clave in data) {
      if (data.hasOwnProperty(clave)) {
        // @ts-ignore
        const elemento = data[clave];
        console.log(elemento);
        centro = elemento["centro"];
        sede = elemento["sede"];
        json_nuevo = {
          ...json_nuevo,
          [clave]: {
            ...elemento
          }
        };
      }
    }
    const codigo = this.llave.generateCode("R" + this.pk);
    // GUARDADO DE LOS DATOS EN LA BASE
    // @ts-ignore
    this.base.escribirDatos(`transaccion/global/${sede['pk']}/${centro['pk']}/${codigo}/`, json_nuevo, this.form);

  }

  guardarTransaccion() {
    let data = {
      ...JSON.parse(JSON.stringify(this.listdo)),
    }
    this.generarRegistro(data);
    const llave = this.llave.generateCode("T" + this.pk);
    this.base.escribirDatos(`historial/${this.pk}/${llave}/`, data, this.form);
    this.listdo = [];
    this.materialesTexto = "";
  }
  constructor(private base: DatabaseService, private fb: FormBuilder,
              private fechaHora:FechaHoraService,
              private llave:LlaveService) {
  }

  ngOnInit() {
    this.get_sedes();
    this.get_centros();
    this.get_materiales();
  }
}
