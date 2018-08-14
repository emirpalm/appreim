import { Component, OnInit } from '@angular/core';
import { Placa } from '../../models/placas.models';
import { PlacaService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
    selector: 'app-placa',
    templateUrl: './placa.component.html',
    styles: []
  })

  export class PlacaComponent implements OnInit {
    placa: Placa = new Placa();
    constructor(public _placaService: PlacaService,
      public router: Router,
      public activatedRoute: ActivatedRoute,
      public _modalUploadService: ModalUploadService) {

        activatedRoute.params.subscribe( params => {

          // tslint:disable-next-line:prefer-const
          let id = params['id'];

          if ( id !== 'nuevo' ) {
            this.cargarPlaca( id );
          }

        });
      }

    ngOnInit() {

    }

    cargarPlaca( id: string ) {
      this._placaService.cargarPlaca( id )
            .subscribe( placa => {

              console.log( placa );
              this.placa = placa;
              this.placa.usuario = placa.usuario._id;
            });
    }

    guardarPlaca( f: NgForm ) {

      console.log( f.valid );
      console.log( f.value );

      if ( f.invalid ) {
        return;
      }

      this._placaService.guardarPlaca( this.placa )
              .subscribe( placa => {

                this.placa._id = placa._id;

                this.router.navigate(['/placa', placa._id ]);

              });

    }


  }
