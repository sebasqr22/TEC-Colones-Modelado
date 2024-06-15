import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-ver-historial-general',
  templateUrl: './ver-historial-general.component.html',
  styleUrls: ['./ver-historial-general.component.css']
})
export class VerHistorialGeneralComponent implements OnInit {
  form = this.fb.group({
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required]
  });

  transacciones: any[] = [];
  transaccionesFiltradas: any[] = [];

  constructor(private base: DatabaseService, private fb: FormBuilder) {}

  getTransacciones() {
    this.base.get('historial').then(value => {
      const elementos = value ? JSON.parse(JSON.stringify(value)) : {};

      // Recorrer cada carne y sus identificadores de transacción
      Object.keys(elementos).forEach(carne => {
        const transaccionesPorCarne = elementos[carne];

        Object.keys(transaccionesPorCarne).forEach(idTransaccion => {
          const transacciones = transaccionesPorCarne[idTransaccion];

          // Inicializar total en tec-colones
          let totalTecColones = 0;

          Object.keys(transacciones).forEach(key => {
            const transaccion = transacciones[key];

            // Calcular el total en tec-colones
            const cantidad = transaccion.cantidad;
            const valorUnitario = transaccion.material.valorUnitario;
            const total = cantidad * valorUnitario;
            totalTecColones += total;

            // Obtener la fechaHora correcta (fuera de centro)
            const fechaHora = transaccion.fechaHora;

            // Construir el objeto de transacción con los datos necesarios
            this.transacciones.push({
              id: idTransaccion,
              estudiante: transaccion.carnet,
              cantidad: cantidad,
              fechaHora: fechaHora,
              funcionario: transaccion.funcionario || 'Desconocido', // Omitir si no existe
              centro: transaccion.centro.ubicacion || 'Desconocido',
              totalTecColones: total // Agregar el total en tec-colones a cada transacción
            });
          });
        });
      });
    }).catch(error => {
      console.error("Error al obtener transacciones:", error);
    });
  }

  rangoFecha(fecha: Date, fechaInicio: Date, fechaFin: Date): boolean {
    return fecha >= fechaInicio && fecha <= fechaFin;
  }

  buscarTransacciones() {
    if (this.form.valid) {
      const fechaInicio = this.form.value.fechaInicio;
      const fechaFin = this.form.value.fechaFin;

      if (fechaInicio && fechaFin) {
        const inicio: Date = new Date(fechaInicio);
        const final: Date = new Date(fechaFin);

        if (final < inicio) {
          alert("La fecha final debe ser mayor o igual a la fecha de inicio.");
          return;
        }

        this.transaccionesFiltradas = this.transacciones.filter(transaccion => {
          const fecha = new Date(transaccion.fechaHora);
          return this.rangoFecha(fecha, inicio, final);
        });

        if (this.transaccionesFiltradas.length === 0) {
          alert("No se encontraron transacciones en el rango de fechas seleccionado.");
        }
      } else {
        alert("Por favor, complete todos los campos requeridos.");
      }
    } else {
      alert("Por favor, complete todos los campos requeridos.");
    }
  }

  ngOnInit() {
    this.getTransacciones();
  }
}
