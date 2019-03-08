import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule  } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { ModalDropzoneService } from '../components/modal-dropzone/modal-dropzone.service';

import {
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    OperadorService,
    ClienteService,
    CamionService,
    ContenedorService,
    AgenciaService,
    FleteraService,
    ManiobraService,
    ViajeService,
    BuqueService,
    NavieraService,
    PrealtaService,
    SubirArchivoService,
    ExcelService,
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
      CamionService,
      ContenedorService,
      AgenciaService,
      FleteraService,
      BuqueService,
      ManiobraService,
      ViajeService,
      NavieraService,
      PrealtaService,
      SubirArchivoService,
      ExcelService,
      ModalUploadService,
      ModalDropzoneService,
      LoginGuard,
      AdminGuard,
      VerificaTokenGuard,
      RefreshTokenInterceptor
    ],
    declarations: []
  })
  export class ServiceModule { }
