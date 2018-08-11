import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        loadChildren: './pages/pages.module#PagesModules'
    }

];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true});
