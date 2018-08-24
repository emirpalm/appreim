import { Component, OnInit } from '@angular/core';
import { Camion } from '../../models/camiones.models';
import { CamionService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Fletera } from '../../models/fleteras.models';
import { FleteraService } from '../../services/service.index';

@Component({
    selector: 'app-camion',
    templateUrl: './camion.component.html',
    styles: []
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
              this.camion.fletera = camion.fletera._id;
              this.cambioFletera( this.camion.fletera );
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
