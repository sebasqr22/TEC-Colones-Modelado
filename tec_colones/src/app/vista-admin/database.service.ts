import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase, Database, ref, set, get, onValue } from 'firebase/database';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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


  escribirDatos(ruta: string, datos: any, form:FormGroup) {
    var error = false;
    // @ts-ignore
    const dbRef = ref(this.database, ruta);
    set(dbRef, datos)
      .then(() => {
        alert('Datos escritos correctamente');
        error = false;
      })
      .catch((error) => {
        console.error('Error al escribir datos:', error);
        alert('Error al escribir los datos!!!')
        error = true
      });

    this.reiniciarDatos(error,form);
  }

  getDateTime(): string {
    const now = new Date();
    const dateTime = formatDate(now, 'yyyy-MM-dd HH:mm:ss', 'en-CR');
    return dateTime;
  }

  generateCode(length = 12): string {
    let result = '';
    const charactersLength = this.characters.length;
    for (let i = 0; i < length; i++) {
      result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return "M-" + result;
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

