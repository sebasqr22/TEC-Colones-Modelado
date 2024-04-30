import { Component, ViewChildren, Renderer2, ElementRef, QueryList, OnInit } from '@angular/core';


@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})
export class VistaAdminComponent {
  //VARIABLES ----------------------------------------------------------------------------------------------------------

  busqueda = true;
  @ViewChildren('cambio_color') elementos: QueryList<ElementRef> | undefined;


  pantalla_mostrando = 'crear-materiales'

  //VARIABLES ----------------------------------------------------------------------------------------------------------


  cambiarPantalla(pantalla:string){

    this.pantalla_mostrando = pantalla;
    console.log(this.pantalla_mostrando);
  }


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

  constructor(private renderer: Renderer2){}


  // FUNCIONES INICIALES------------------------------------------------------------------------------------------------

  ngOnInit():void{
  }


  // FUNCIONES INICIALES------------------------------------------------------------------------------------------------
}
