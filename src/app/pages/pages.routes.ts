import {RouterModule, Routes} from '@angular/router';
import { PagesComponent } from './pages.component';
import { ManiobrasComponent } from './maniobras/maniobras.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginGuardGuard } from '../services/service.index';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
            {path: 'maniobras', component: ManiobrasComponent, data: {titulo: 'Maniobras'}},
            {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Configuración de la cuenta'}},
            {path: 'profile', component: ProfileComponent, data: {titulo: 'Mi perfil'}},
            {path: 'register', component: RegisterComponent, data: {titulo: 'Registrar Usuarios'}},
            // Mantenimientos
            {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de usuarios'}},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
    ];
    export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
