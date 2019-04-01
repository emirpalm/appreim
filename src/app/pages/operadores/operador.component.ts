import { Component, OnInit } from '@angular/core';
import { Operador } from '../../models/operadores.models';
import { OperadorService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
// datapiker
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';

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
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.css'],
  providers: [
      // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
      // application's root module. We provide it at the component level here, due to limitations of
      // our example generation script.
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
      {provide: MAT_DATE_LOCALE, useValue: 'es-mx' },
    ],
})
export class OperadorComponent implements OnInit {

  operador: Operador = new Operador();


  constructor(
    public _operadorService: OperadorService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe( params => {

      // tslint:disable-next-line:prefer-const
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarOperador( id );
      }

    });
  }

  ngOnInit() {

    this._modalUploadService.notification
    .subscribe( resp => {
      this.operador.img = resp.operador.img;
    });
  }

  cargarOperador( id: string ) {
    this._operadorService.cargarOperador( id )
          .subscribe( operador => {

            console.log( operador );
            this.operador = operador;
            this.operador.usuario = operador.usuario._id;
          });
  }

  guardarOperador( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._operadorService.guardarOperador( this.operador )
            .subscribe( operador => {

              this.operador._id = operador._id;

              this.router.navigate(['/operador', operador._id ]);

            });

  }


  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'operadores', this.operador._id );

  }


}
