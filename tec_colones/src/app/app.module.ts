import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VistaUsuarioComponent } from './vista-usuario/vista-usuario.component';
import { VistaAdminComponent } from './vista-admin/vista-admin.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CrearMaterialesComponent } from './vista-admin/crear-materiales/crear-materiales.component';
import { VerMaterialesComponent } from './vista-admin/ver-materiales/ver-materiales.component';
import { CrearSedesComponent } from './vista-admin/crear-sedes/crear-sedes.component';
import { VerSedesComponent } from './vista-admin/ver-sedes/ver-sedes.component';
import { CrearCentrosComponent } from './vista-admin/crear-centros/crear-centros.component';
import { VerCentrosComponent } from './vista-admin/ver-centros/ver-centros.component';


const appRoutes:Routes=[
  {path:'', component: VistaAdminComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    VistaUsuarioComponent,
    VistaAdminComponent,
    CrearMaterialesComponent,
    VerMaterialesComponent,
    CrearSedesComponent,
    VerSedesComponent,
    CrearCentrosComponent,
    VerCentrosComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
