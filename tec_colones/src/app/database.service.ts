import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase, Database, ref, set, get, onValue } from 'firebase/database';

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


  ngOnInit() {
    this.app = initializeApp(this.firebase);
    this.database = getDatabase(this.app);
  }

  cargarDatos(route: string, json: any) {

  }



  constructor() { }
}

