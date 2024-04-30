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
