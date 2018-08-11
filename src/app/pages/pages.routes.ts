import {RouterModule, Routes} from '@angular/router';
import { PagesComponent } from './pages.component';
import { ManiobrasComponent } from './maniobras/maniobras.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
// Guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ VerificaTokenGuard ],
        data: { titulo: 'Dashboard' }
    },
            {path: 'maniobras', component: ManiobrasComponent, data: {titulo: 'Maniobras'}},
            {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Configuración de la cuenta'}},
            {path: 'profile', component: ProfileComponent, data: {titulo: 'Mi perfil'}},
    // Register
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Registrar Usuarios' }
    },
    // Mantenimientos
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Usuarios' }
    },
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ];
    export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
