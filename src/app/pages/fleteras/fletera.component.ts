import { Component, OnInit } from '@angular/core';
import { Fletera } from '../../models/fleteras.models';
import { FleteraService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-fletera',
  templateUrl: './fletera.component.html',
  styles: []
})
export class FleteraComponent implements OnInit {
  fletera: Fletera = new Fletera();
  constructor(public _fleteraService: FleteraService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService) {

      activatedRoute.params.subscribe( params => {

        // tslint:disable-next-line:prefer-const
        let id = params['id'];

        if ( id !== 'nuevo' ) {
          this.cargarFletera( id );
        }

      });
    }

  ngOnInit() {

  }

  cargarFletera( id: string ) {
    this._fleteraService.cargarFletera( id )
          .subscribe( fletera => {

            console.log( fletera );
            this.fletera = fletera;
            this.fletera.usuario = fletera.usuario._id;
          });
  }

  guardarFletera( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._fleteraService.guardarFletera( this.fletera )
            .subscribe( fletera => {

              this.fletera._id = fletera._id;

              this.router.navigate(['/fletera', fletera._id ]);

            });

  }


}
