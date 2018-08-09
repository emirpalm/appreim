import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManiobrasComponent } from './maniobras/maniobras.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ManiobrasComponent,
        AccountSettingsComponent
    ],
    exports: [
        DashboardComponent,
        ManiobrasComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES
    ]
    })

export class PagesModules {}
