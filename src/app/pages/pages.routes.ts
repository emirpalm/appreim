import {RouterModule, Routes} from '@angular/router';
import { PagesComponent } from './pages.component';
import { ManiobrasComponent } from './maniobras/maniobras.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'maniobras', component: ManiobrasComponent},
            {path: 'account-settings', component: AccountSettingsComponent},
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
    ];
    export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
