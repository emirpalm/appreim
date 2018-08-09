import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
    SettingsService,
    SharedService,
    SidebarService
   } from './service.index';

   @NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
      SettingsService,
      SharedService,
      SidebarService
    ],
    declarations: []
  })
  export class ServiceModule { }
