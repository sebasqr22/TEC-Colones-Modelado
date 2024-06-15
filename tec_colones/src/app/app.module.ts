import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VistaUsuarioComponent } from './vista-usuario/vista-usuario.component';
import { VistaAdminComponent } from './vista-admin/vista-admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CrearMaterialesComponent } from './vista-admin/crear-materiales/crear-materiales.component';
import { VerMaterialesComponent } from './vista-admin/ver-materiales/ver-materiales.component';
import { CrearSedesComponent } from './vista-admin/crear-sedes/crear-sedes.component';
import { VerSedesComponent } from './vista-admin/ver-sedes/ver-sedes.component';
import { CrearCentrosComponent } from './vista-admin/crear-centros/crear-centros.component';
import { VerCentrosComponent } from './vista-admin/ver-centros/ver-centros.component';
import { AsignacionTecColonesComponent } from './vista-admin/asignacion-tec-colones/asignacion-tec-colones.component';
import { VerHistorialCentrosComponent } from './vista-admin/ver-historial-centros/ver-historial-centros.component';
import { LoginComponent } from './vista-login/login/login.component';
import { AnularTransaccionComponent } from './vista-admin/anular-transaccion/anular-transaccion.component';
import { VerHistorialGeneralComponent } from './vista-admin/ver-historial-general/ver-historial-general.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'vista-admin', component: VistaAdminComponent},
  { path: 'vista-usuario', component: VistaUsuarioComponent}
];





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
    AsignacionTecColonesComponent,
    VerHistorialCentrosComponent,
    LoginComponent,
    AnularTransaccionComponent,
    VerHistorialGeneralComponent,
  ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
