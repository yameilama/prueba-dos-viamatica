import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { AdminUsersComponent } from './users/admin-users/admin-users.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientsHeaderComponent } from './header/clients-header/clients-header.component';
import { ContractComponent } from './clients/contract/contract.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { UsuarioGestorComponent } from './usuario-gestor/usuario-gestor.component';
import { GestorHeaderComponent } from './usuario-gestor/gestor-header/gestor-header.component';
import { UsuarioCajaComponent } from './usuario-caja/usuario-caja.component';
import { CajaHeaderComponent } from './usuario-caja/caja-header/caja-header.component';
import { CajaComponent } from './usuario-gestor/caja/caja.component';
import { EditCajaComponent } from './usuario-gestor/edit-caja/edit-caja.component';
import { AsignarTurnoComponent } from './usuario-gestor/asignar-turno/asignar-turno.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    DashboardComponent,
    HeaderComponent,
    UsersComponent,
    AdminUsersComponent,
    ClientsComponent,
    ClientsHeaderComponent,
    ContractComponent,
    UnauthorizedComponent,
    UsuarioGestorComponent,
    GestorHeaderComponent,
    UsuarioCajaComponent,
    CajaHeaderComponent,
    CajaComponent,
    EditCajaComponent,
    AsignarTurnoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
