import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'tec_colones';
  tipoUsuario = 'admin';
  busqueda = true;



  pantallaBusqueda(){
    this.busqueda = !this.busqueda;
    const todo = document.getElementById('todo');
    if(this.busqueda){
      // @ts-ignore
      todo.className = '';
    }
    else{
      // @ts-ignore
      todo.className = 'sb-sidenav-toggled';
    }
  }

  constructor(){
  }
}
