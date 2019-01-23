import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/clientes.models';
import { ClienteService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-misclientes',
  templateUrl: './misclientes.component.html',
  styles: []
})
export class MisclientesComponent implements OnInit {
  cliente: Cliente = new Cliente();
  constructor(public _clienteService: ClienteService,
    public router: Router,
    public activatedRoute: ActivatedRoute) { 
      activatedRoute.params.subscribe( params => {

        // tslint:disable-next-line:prefer-const
        let id = params['id'];

        if ( id !== 'nuevo' ) {
          this.cargarClientes( id );
        }

      });
    }

  ngOnInit() {
  }

  cargarClientes( id: string ) {
    this._clienteService.cargarClientesEmpresa( id )
          .subscribe( cliente => {

            console.log( cliente );
            this.cliente = cliente;
            this.cliente.usuario = cliente.usuario._id;
          });
  }

}
