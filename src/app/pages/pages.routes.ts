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
import { NavierasComponent } from './navieras/navieras.component';
import { NavieraComponent } from './navieras/naviera.component';
import { DonwloadrequestComponent } from './donwloadrequest/donwloadrequest.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { MisclientesComponent } from './misclientes/misclientes.component';

// Guards
// import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';
// import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { ManiobraComponent } from './maniobras/maniobra.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AddcontainersComponent } from './addcontainers/addcontainers.component';




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
    // Solicitud Descarga
    {
        path: 'aadescarga',
        component: DonwloadrequestComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Solicitud de descargas' }
    },
    // Mantenimientos ADMIN ROLE
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Usuarios' }
    },
    {
        path: 'operadores',
        component: OperadoresComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Operadores' }
    },
    {path: 'operador/:id', component: OperadorComponent,  canActivate: [ AdminGuard ], data: {titulo: 'Actualizacion de datos'}},
    {
        path: 'camiones',
        component: CamionesComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de camiones' }
    },
    {path: 'camion/:id', component: CamionComponent,  canActivate: [ AdminGuard ], data: {titulo: 'Actualizacion de camiones'}},
    {
        path: 'contenedores',
        component: ContenedoresComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Contenedores' }
    },
    {path: 'agencia/:id', component: AgenciaComponent,  canActivate: [ AdminGuard ], data: {titulo: 'Actualizacion de agencia'}},
    {
        path: 'agencias',
        component: AgenciasComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Agencias' }
    },
    {path: 'fletera/:id', component: FleteraComponent,  canActivate: [ AdminGuard ], data: {titulo: 'Actualizacion de transportista'}},
    {
        path: 'fleteras',
        component: FleterasComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de transportistas' }
    },
    {path: 'viaje/:id', component: ViajeComponent, data: {titulo: 'Actualizacion de viajes'}},
    {path: 'addcontainers/:id', component: AddcontainersComponent, data: {titulo: 'Actualizacion de contenedores del viaje'}},
    {
        path: 'viajes',
        component: ViajesComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de viajes' }
    },
    {path: 'contenedor/:id', component: ContenedorComponent, canActivate: [ AdminGuard ], data: {titulo: 'Actualizacion de contenedores'}},
    {
        path: 'clientes',
        component: ClientesComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Clientes' }
    },
    {path: 'cliente/:id', component: ClienteComponent, canActivate: [ AdminGuard ], data: {titulo: 'Actualizacion de clientes'}},
    {
        path: 'navieras',
        component: NavierasComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Navieras' }
    },
    {path: 'naviera/:id', component: NavieraComponent, canActivate: [ AdminGuard ], data: {titulo: 'Actualizacion de datos'}},
    {path: 'misempresas', component: EmpresaComponent, canActivate: [ AdminGuard ], data: {titulo: 'Actualizacion de datos'}},
    {path: 'misclientes/:id', component: MisclientesComponent, canActivate: [ AdminGuard ], data: {titulo: 'Actualizacion de datos'}},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ];
    export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
