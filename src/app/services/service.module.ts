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
    LoginGuard,
    AdminGuard,
    VerificaTokenGuard,
    RefreshTokenInterceptor
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
      LoginGuard,
      AdminGuard,
      VerificaTokenGuard,
      RefreshTokenInterceptor
    ],
    declarations: []
  })
  export class ServiceModule { }
