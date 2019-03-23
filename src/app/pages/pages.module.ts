import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


// MODULES
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManiobrasComponent } from './maniobras/maniobras.component';
import { ManiobraComponent } from './maniobras/maniobra.component';
// import { PagesComponent } from './pages.component';
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
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AgenciasComponent } from './agencias/agencias.component';
import { AgenciaComponent } from './agencias/agencia.component';
import { FleterasComponent } from './fleteras/fleteras.component';
import { FleteraComponent } from './fleteras/fletera.component';
import { ViajesComponent } from './viajes/viajes.component';
import { ViajeComponent } from './viajes/viaje.component';
import { AddcontainersComponent } from './addcontainers/addcontainers.component';
import { NavierasComponent } from './navieras/navieras.component';
import { NavieraComponent } from './navieras/naviera.component';
import { DonwloadrequestComponent } from './donwloadrequest/donwloadrequest.component';
import { FotosComponent } from './fotos/fotos.component';
import { NgDropFilesDirective } from '.././directives/ng-drop-files.directive';
import { EmpresaComponent } from './empresa/empresa.component';
import { MisclientesComponent } from './misclientes/misclientes.component';
import { MiclienteComponent } from './misclientes/micliente.component';
import { ApprovalPageComponent } from './approval-page/approval-page.component';

// Pipes Modulos
import { PipesModule } from '../pipes/pipes.module';
// import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


import {
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule
  } from '@angular/material';



@NgModule({
    declarations: [
        // PagesComponent,
        DashboardComponent,
        ManiobrasComponent,
        ManiobraComponent,
        AccountSettingsComponent,
        RegisterComponent,
        ProfileComponent,
        UsuariosComponent,
        OperadoresComponent,
        OperadorComponent,
        CamionesComponent,
        CamionComponent,
        ContenedoresComponent,
        ContenedorComponent,
        ClientesComponent,
        ClienteComponent,
        AgenciasComponent,
        AgenciaComponent,
        FleterasComponent,
        FleteraComponent,
        ViajesComponent,
        ViajeComponent,
        BusquedaComponent,
        FotosComponent,
        NgDropFilesDirective,
        AddcontainersComponent,
        NavierasComponent,
        NavieraComponent,
        DonwloadrequestComponent,
        EmpresaComponent,
        MisclientesComponent,
        MiclienteComponent,
        ApprovalPageComponent
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
        PipesModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatRadioModule
    ]
    })

export class PagesModules {}
