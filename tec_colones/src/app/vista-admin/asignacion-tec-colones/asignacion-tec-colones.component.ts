import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { FechaHoraService } from "../fecha-hora.service";
import { LlaveService } from "../llave.service";

interface Sede {
  nombre: string;
}

interface Centro {
  ubicacion: string;
  sede: Sede;
}

interface Material {
  nombre: string;
  valorUnitario: number;
  estado: string;
}

interface FormValue {
  sede: Sede;
  centro: Centro;
  carnet: string;
  material: Material;
  cantidad: number;
}

@Component({
  selector: 'app-asignacion-tec-colones',
  templateUrl: './asignacion-tec-colones.component.html',
  styleUrls: ['./asignacion-tec-colones.component.css']
})
export class AsignacionTecColonesComponent implements OnInit {
  protected sedes: Sede[] = [];
  private centros_json: Centro[] = [];
  protected centros: Centro[] = [];
  protected centros_aux: Centro[] = [];
  protected materiales: Material[] = [];

  private listdo: any[] = [];
  materialesTexto: string = '';
  private pk: string = "";

  form = this.fb.group({
    sede:['', Validators.required],
    centro:['', Validators.required],
    carnet:['', Validators.required],
    material:['', Validators.required],
    cantidad:['', Validators.required]
  })
  form: FormGroup = this.fb.group({
    sede: ['', Validators.required],
    centro: ['', Validators.required],
    carnet: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
    material: ['', Validators.required],
    cantidad: ['', [Validators.required, Validators.min(1)]]
  });

  cambiarCentros() {
    const sede = this.form.value.sede;
    this.centros_aux = [];
    let valor: string | null | undefined = sede;

    for (let clave in this.centros_json) {
      if (this.centros_json.hasOwnProperty(clave)) {
        const elemento = this.centros_json[clave];
        //if(elemento['sede']['nombre'] == valor){
        if (elemento.sede.nombre === valor) {
          this.centros_aux.push(elemento);
        }
      }
    }
  }

  get_sedes() {
    this.base.get('sedes').then((value: any) => {
      const elementos = JSON.parse(JSON.stringify(value));
      for (let clave in elementos) {
        if (elementos.hasOwnProperty(clave)) {
          const elemento = elementos[clave];
          this.sedes.push(elemento);
        }
      }
    });
  }

  get_centros() {
    this.base.get('centros').then((value: any) => {
      const elementos = JSON.parse(JSON.stringify(value));
      this.centros_json = elementos;
      for (let clave in elementos) {
        if (elementos.hasOwnProperty(clave)) {
          const elemento = elementos[clave];
          this.centros.push(elemento);
        }
      }
    });
  }

  get_materiales() {
    this.base.get('material').then((value: any) => {
      const elementos = JSON.parse(JSON.stringify(value));
      for (let clave in elementos) {
        if (elementos.hasOwnProperty(clave)) {
          const elemento = elementos[clave];
          if (elemento.estado === "activo") {
            this.materiales.push(elemento);
          }
        }
      }
    });
  }

  agregarMaterial() {
    const valores = this.form.value as FormValue;

    if (this.form.valid && valores.material && valores.cantidad) {
      const materialExistente = this.listdo.find(m => m.material.nombre === valores.material.nombre);

      if (materialExistente) {
        alert("Este material ya ha sido agregado.");
        return;
      }

  agregarMaterial(){
    const valores = this.form.value;
    if(this.form.valid){
      const nuevo = {
        ...valores,
        fechaHora: this.fechaHora.getDateTime()
      };

      this.listdo.push(nuevo);
      // @ts-ignore
      this.pk = this.form.value.carnet;
      // @ts-ignore
      this.materialesTexto += `${valores.material["nombre"]} \t --- \t valor: ₡${valores.material["valorUnitario"] * Number(valores.cantidad)}\n`

      this.pk = this.form.value.carnet as string;
      this.materialesTexto += `${valores.material.nombre} \t --- \t valor: ₡${valores.material.valorUnitario * Number(valores.cantidad)}\n`;

      this.form.patchValue({
        material: '',
        cantidad: ''
      });
    } else {
      alert("Datos Inválidos...");
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
  guardarTransaccion() {
    const data = {
      ...JSON.parse(JSON.stringify(this.listdo)),
    };

    const llave = this.llave.generateCode("T");
    this.base.escribirDatos(`historial/${this.pk}/${llave}/`, data, this.form);
    this.listdo = [];
    this.materialesTexto = "";
  }

  cancelarTransaccion() {
    this.form.reset();
    this.materialesTexto = "";
    this.listdo = [];
  }

  constructor(private base: DatabaseService, private fb: FormBuilder,
              private fechaHora: FechaHoraService,
              private llave: LlaveService) { }

  ngOnInit() {
    this.get_sedes();
    this.get_centros();
    this.get_materiales();
  }
}
