import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


// MODULES
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManiobrasComponent } from './maniobras/maniobras.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

// Pipes Modulos
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
    declarations: [
        // PagesComponent,
        DashboardComponent,
        ManiobrasComponent,
        AccountSettingsComponent,
        RegisterComponent,
        ProfileComponent,
        UsuariosComponent
       // ModalUploadComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ReactiveFormsModule,
        PipesModule
    ]
    })

export class PagesModules {}
