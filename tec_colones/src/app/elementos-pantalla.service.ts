import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementosPantallaService {

  elementosPantalla = {
    'materiales':{
      'crearMaterial':[
        'crearMaterial',
        'crearMateriali',
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
