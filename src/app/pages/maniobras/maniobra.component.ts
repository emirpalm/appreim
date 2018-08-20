import { Component, OnInit } from '@angular/core';
import { Maniobra } from '../../models/maniobras.models';
import { ManiobraService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Operador } from '../../models/operadores.models';
import { OperadorService } from '../../services/service.index';
import { Placa } from '../../models/placas.models';
import { PlacaService } from '../../services/service.index';
import { Contenedor } from '../../models/contenedores.models';
import { ContenedorService } from '../../services/service.index';
import { Cliente } from '../../models/clientes.models';
import { ClienteService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-maniobra',
  templateUrl: './maniobra.component.html',
  styleUrls: ['./maniobra.component.css'],
})
export class ManiobraComponent implements OnInit {

  maniobra: Maniobra = new Maniobra();
  operadores: Operador[] = [];
  operador: Operador = new Operador('');
  placas: Placa[] = [];
  placa: Placa = new Placa('');
  contenedores: Contenedor[] = [];
  contenedor: Contenedor = new Contenedor('');
  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente('');

  constructor(
    public _maniobraService: ManiobraService,
    public _operadorService: OperadorService,
    public _placaService: PlacaService,
    public _contenedorService: ContenedorService,
    public _clienteService: ClienteService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe( params => {

      // tslint:disable-next-line:prefer-const
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarManiobra( id );
      }

    });

  }

  ngOnInit() {

    this._operadorService.cargarOperadores()
          .subscribe( operadores => this.operadores = operadores );
    this._placaService.cargarPlacas()
          .subscribe( placas => this.placas = placas );
    this._contenedorService.cargarContenedores()
          .subscribe( contenedores => this.contenedores = contenedores );
    this._clienteService.cargarClientes()
          .subscribe( clientes => this.clientes = clientes );

  }

  cargarManiobra( id: string ) {
    this._maniobraService.cargarManiobra( id )
          .subscribe( maniobra => {

            console.log( maniobra );
            this.maniobra = maniobra;
            this.maniobra.operador = maniobra.operador._id;
            this.cambioOperador( this.maniobra.operador );
            this.maniobra.placas = maniobra.placas._id;
            this.cambioPlaca( this.maniobra.placas );
            this.maniobra.contenedor = maniobra.contenedor._id;
            this.cambioContenedor( this.maniobra.contenedor );
            this.maniobra.cliente = maniobra.cliente._id;
            this.cambioCliente( this.maniobra.cliente );
          });
  }

  guardarManiobra( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._maniobraService.guardarManiobra( this.maniobra )
            .subscribe( maniobra => {

              this.maniobra._id = maniobra._id;

              this.router.navigate(['/maniobra', maniobra._id ]);

            });

  }

  cambioOperador( id: string ) {

    this._operadorService.cargarOperador( id )
          .subscribe( operador => this.operador = operador );

  }

  cambioPlaca( id: string ) {

    this._placaService.cargarPlaca( id )
          .subscribe( placa => this.placa = placa );

  }

  cambioContenedor( id: string ) {

    this._contenedorService.cargarContenedor( id )
          .subscribe( contenedor => this.contenedor = contenedor );

  }

  cambioCliente( id: string ) {

    this._clienteService.cargarCliente( id )
          .subscribe( cliente => this.cliente = cliente );

  }


}
