import { Component, OnInit } from '@angular/core';
import { Operador } from '../../models/operadores.models';
import { OperadorService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styles: []
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
