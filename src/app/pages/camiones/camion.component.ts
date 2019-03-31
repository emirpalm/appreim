import { Component, OnInit } from '@angular/core';
import { Camion } from '../../models/camiones.models';
import { CamionService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Fletera } from '../../models/fleteras.models';
import { FleteraService } from '../../services/service.index';
// datapiker
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment} from 'moment';
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
    selector: 'app-camion',
    templateUrl: './camion.component.html',
    styles: [],
    providers: [
      // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
      // application's root module. We provide it at the component level here, due to limitations of
      // our example generation script.
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
      {provide: MAT_DATE_LOCALE, useValue: 'es-mx' },
    ],
  })

  export class CamionComponent implements OnInit {
    fleteras: Fletera[] = [];
    fletera: Fletera = new Fletera('');
    camion: Camion = new Camion();
    constructor(public _camionService: CamionService,
      public _fleteraService: FleteraService,
      public router: Router,
      public activatedRoute: ActivatedRoute,
      public _modalUploadService: ModalUploadService) {

        activatedRoute.params.subscribe( params => {

          // tslint:disable-next-line:prefer-const
          let id = params['id'];

          if ( id !== 'nuevo' ) {
            this.cargarCamion( id );
          }

        });
      }

    ngOnInit() {
      this._fleteraService.cargarFleteras()
      .subscribe( fleteras => this.fleteras = fleteras );

    }

    cargarCamion( id: string ) {
      this._camionService.cargarCamion( id )
            .subscribe( camion => {

              console.log( camion );
              this.camion = camion;
              this.camion.usuario = camion.usuario._id;
            });
    }

    guardarCamion( f: NgForm ) {

      console.log( f.valid );
      console.log( f.value );

      if ( f.invalid ) {
        return;
      }

      this._camionService.guardarCamion( this.camion )
              .subscribe( camion => {

                this.camion._id = camion._id;

                this.router.navigate(['/camion', camion._id ]);

              });

    }
    cambioFletera( id: string ) {

      this._fleteraService.cargarFletera( id )
            .subscribe( fletera => this.fletera = fletera );

    }


  }
