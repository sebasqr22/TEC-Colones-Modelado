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



  pantallas = ['crearMaterial'];
  pantallaActual = 'crearMaterial';

  miembrosActuales = ['crearMaterial', 'crearMateriali', 'materiales'];

  pantalla_mostrando = 'crear-materiales'


  //colores

  encendido = 'white';
  apagado = '#6c757d';

  //VARIABLES ----------------------------------------------------------------------------------------------------------

  actualizarMiembros(pantalla:string){
    this.miembrosActuales.forEach(miembro => {
      const elemento = document.getElementById(miembro);
      console.log(elemento);
      // @ts-ignore
      elemento.style.color = this.apagado;
    }) //apagar miembros antiguios


    // @ts-ignore
    this.miembrosActuales = this.elementosPantalla['admin'][pantalla];
    this.miembrosActuales.forEach(miembro => {
      const elemento = document.getElementById(miembro);
      console.log(elemento);
      // @ts-ignore
      elemento.style.color = this.encendido;
    }) //encender miembros nuevos
  }


  cambiarPantalla(pantalla:string){

    this.pantalla_mostrando = pantalla;
    //this.actualizarMiembros(pantalla);
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


  cambiarColor(color:string) {
    // @ts-ignore
    this.elementos.forEach(elemento => {
      this.renderer.setStyle(elemento.nativeElement, 'color', color);
    });
  }


  constructor(private renderer: Renderer2){}


  // FUNCIONES INICIALES------------------------------------------------------------------------------------------------
  esconderTodas(){
    let actual ;
    this.pantallas.forEach(pantalla => {
      actual = document.getElementById(pantalla);
      // @ts-ignore
      actual.style.display = 'none';
    })
    actual = document.getElementById(this.pantallaActual);
    // @ts-ignore
    actual.style.display = 'block';
  }


  actualizarEncendidos(){
    this.miembrosActuales.forEach(miembro => {
      const ele = document.getElementById(miembro);
      // @ts-ignore
      ele.style.color = this.encendido;
    })
  }




  ngOnInit():void{
    this.esconderTodas();
    this.actualizarEncendidos();
  }


  // FUNCIONES INICIALES------------------------------------------------------------------------------------------------
}
