import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementosPantallaService {

  elementosPantalla = {
    'admin': {
        "crear-materiales": [
          "crearMateriala",
          "crearMateriali",
          "materiales"
        ],
      'verListadoDeMateriales':[
        'verListadoDeMaterialesa',
        'verListadoDeMaterialesi',
        'materiales'
      ]
    }
  }

  getElementos(){
    return this.elementosPantalla;
  }

  constructor() {
  }

}
