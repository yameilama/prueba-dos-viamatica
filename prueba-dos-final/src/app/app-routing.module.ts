import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ContractComponent } from "./clients/contract/contract.component";
import { ClientsComponent } from "./clients/clients.component";
import { RoleGuard } from "./role-guard";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { AdminUsersComponent } from "./users/admin-users/admin-users.component";
import { UsuarioGestorComponent } from "./usuario-gestor/usuario-gestor.component";
import { UsuarioCajaComponent } from "./usuario-caja/usuario-caja.component";


const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'welcome', component: WelcomeComponent, canActivate: [RoleGuard], data: { expectedRole: 'ADMINISTRADOR' } },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'clients', component: ClientsComponent, canActivate: [RoleGuard], data: { expectedRole: 'CLIENTE' } },
    { path: 'contract', component: ContractComponent },
    { path: 'admin-users', component: AdminUsersComponent, canActivate: [RoleGuard], data: { expectedRole: 'ADMINISTRADOR' } },
    { path: 'usuario-gestor', component: UsuarioGestorComponent, canActivate: [RoleGuard], data: { expectedRole: 'GESTOR' } },
    { path: 'usuario-caja', component: UsuarioCajaComponent, canActivate: [RoleGuard], data: { expectedRole: 'CAJERO' } },

    { path: 'unauthorized', component: UnauthorizedComponent },

];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}