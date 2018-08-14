import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    OperadorService,
    ClienteService,
    PlacaService,
    ContenedorService,
    ManiobraService,
    SubirArchivoService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard
   } from './service.index';


   @NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
      SettingsService,
      SharedService,
      SidebarService,
      UsuarioService,
      OperadorService,
      ClienteService,
      PlacaService,
      ContenedorService,
      ManiobraService,
      SubirArchivoService,
      ModalUploadService,
      LoginGuardGuard,
      AdminGuard,
      VerificaTokenGuard
    ],
    declarations: []
  })
  export class ServiceModule { }
