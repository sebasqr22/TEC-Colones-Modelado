import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase, Database, ref, set, get, onValue } from 'firebase/database';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  firebase = {
    apiKey: "AIzaSyDe7h2KiiCpKoZRoj8HSvAyTf2g0255Pfw",
    authDomain: "tec-colones.firebaseapp.com",
    databaseURL: "https://tec-colones-default-rtdb.firebaseio.com",
    projectId: "tec-colones",
    storageBucket: "tec-colones.appspot.com",
    messagingSenderId: "773949849080",
    appId: "1:773949849080:web:59cf2f204e5c9583186a0d"
  }

  app: null|FirebaseApp = null;
  database: null|Database = null;

  reiniciarDatos(error:boolean, form:FormGroup){
    if(!error){
      form.reset();
    }
  }


  escribirDatos(ruta: string, datos: any, form: FormGroup) {
    const identificador = datos.identificador; // Obtener el identificador del objeto datos

    // @ts-ignore
    const dbRef = ref(this.database, ruta);

    // Primero, verificamos si el identificador ya existe
    get(dbRef).then((snapshot) => {
      console.log(snapshot.exists());
      if (snapshot.exists()) {

        alert(`El identificador "${snapshot.val().pk}" ya existe. No se escribieron los datos.`);

      } else {
        // Si no hay datos existentes, escribir los nuevos datos
        set(dbRef, datos)
          .then(() => {
            alert('Datos escritos correctamente');
            this.reiniciarDatos(false, form);
          })
          .catch((error) => {
            console.error('Error al escribir datos:', error);
            alert(`Error presente: ${error}`);
            this.reiniciarDatos(true, form);
          });
      }
    }).catch((error) => {
      console.error('Error al leer datos existentes:', error);
      alert('Error al verificar los datos existentes!!!');
      this.reiniciarDatos(true, form);
    });
  }

  async get(ruta: string): Promise<any> {
    try {
      // @ts-ignore
      const dbRef = ref(this.database, ruta);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log('No existen datos en la ruta:', ruta);
        return null;
      }
    } catch (error) {
      console.error('Error al leer datos:', error);
      return null;
    }
  }

  constructor() {
    this.app = initializeApp(this.firebase);
    this.database = getDatabase(this.app);
  }
}

