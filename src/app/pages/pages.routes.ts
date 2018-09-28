import {RouterModule, Routes} from '@angular/router';
// import { PagesComponent } from './pages.component';
import { ManiobrasComponent } from './maniobras/maniobras.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { OperadoresComponent } from './operadores/operadores.component';
import { OperadorComponent } from './operadores/operador.component';
import { CamionesComponent } from './camiones/camiones.component';
import { CamionComponent } from './camiones/camion.component';
import { ContenedoresComponent } from './contenedores/contenedores.component';
import { ContenedorComponent } from './contenedores/contenedor.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './clientes/cliente.component';
import { AgenciasComponent } from './agencias/agencias.component';
import { AgenciaComponent } from './agencias/agencia.component';
import { FleterasComponent } from './fleteras/fleteras.component';
import { FleteraComponent } from './fleteras/fletera.component';
import { ViajesComponent } from './viajes/viajes.component';
import { ViajeComponent } from './viajes/viaje.component';
import { FotosComponent } from './fotos/fotos.component';
// Guards
// import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';
// import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { ManiobraComponent } from './maniobras/maniobra.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' }
    },
            {path: 'maniobras', component: ManiobrasComponent, data: {titulo: 'Maniobras'}},
            {path: 'maniobra/:id', component: ManiobraComponent, data: {titulo: 'Maniobra'}},
            {path: 'fotos/:id', component: FotosComponent, data: {titulo: 'Fotos'}},
            {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Configuración de la cuenta'}},
            {path: 'profile', component: ProfileComponent, data: {titulo: 'Mi perfil'}},
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
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
    {
        path: 'operadores',
        component: OperadoresComponent,
        data: { titulo: 'Mantenimiento de Operadores' }
    },
    {path: 'operador/:id', component: OperadorComponent, data: {titulo: 'Actualizacion de datos'}},
    {
        path: 'camiones',
        component: CamionesComponent,
        data: { titulo: 'Mantenimiento de camiones' }
    },
    {path: 'camion/:id', component: CamionComponent, data: {titulo: 'Actualizacion de camiones'}},
    {
        path: 'contenedores',
        component: ContenedoresComponent,
        data: { titulo: 'Mantenimiento de Contenedores' }
    },
    {path: 'agencia/:id', component: AgenciaComponent, data: {titulo: 'Actualizacion de agencia'}},
    {
        path: 'agencias',
        component: AgenciasComponent,
        data: { titulo: 'Mantenimiento de Agencias' }
    },
    {path: 'fletera/:id', component: FleteraComponent, data: {titulo: 'Actualizacion de fletera'}},
    {
        path: 'fleteras',
        component: FleterasComponent,
        data: { titulo: 'Mantenimiento de Fleteras' }
    },
    {path: 'viaje/:id', component: ViajeComponent, data: {titulo: 'Actualizacion de viajes'}},
    {
        path: 'viajes',
        component: ViajesComponent,
        data: { titulo: 'Mantenimiento de viajes' }
    },
    {path: 'contenedor/:id', component: ContenedorComponent, data: {titulo: 'Actualizacion de contenedores'}},
    {
        path: 'clientes',
        component: ClientesComponent,
        data: { titulo: 'Mantenimiento de Clientes' }
    },
    {path: 'cliente/:id', component: ClienteComponent, data: {titulo: 'Actualizacion de clientes'}},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ];
    export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
