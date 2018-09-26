import { Component, OnInit, ViewChild } from '@angular/core';
import { Maniobra } from '../../models/maniobras.models';
import { ManiobraService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Operador } from '../../models/operadores.models';
import { OperadorService } from '../../services/service.index';
import { Camion } from '../../models/camiones.models';
import { CamionService } from '../../services/service.index';
import { Contenedor } from '../../models/contenedores.models';
import { ContenedorService } from '../../services/service.index';
import { Cliente } from '../../models/clientes.models';
import { ClienteService } from '../../services/service.index';
import { Agencia } from '../../models/agencias.models';
import { AgenciaService } from '../../services/service.index';
import { Fletera } from '../../models/fleteras.models';
import { FleteraService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDropzoneService } from '../../components/modal-dropzone/modal-dropzone.service';


@Component({
  selector: 'app-maniobra',
  templateUrl: './maniobra.component.html',
  styleUrls: ['./maniobra.component.css'],
})
export class ManiobraComponent implements OnInit {

  maniobra: Maniobra = new Maniobra('', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  operadores: Operador[] = [];
  operador: Operador = new Operador('');
  camiones: Camion[] = [];
  camion: Camion = new Camion('', '', '');
  contenedores: Contenedor[] = [];
  contenedor: Contenedor = new Contenedor('');
  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente('');
  agencias: Agencia[] = [];
  agencia: Agencia = new Agencia('', '');
  fleteras: Fletera[] = [];
  fletera: Fletera = new Fletera('', '');


  constructor(
    public _maniobraService: ManiobraService,
    public _operadorService: OperadorService,
    public _camionService: CamionService,
    public _contenedorService: ContenedorService,
    public _clienteService: ClienteService,
    public _agenciaService: AgenciaService,
    public _fleteraService: FleteraService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalDropzoneService: ModalDropzoneService
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
    this._camionService.cargarCamiones()
          .subscribe( camiones => this.camiones = camiones );
    this._contenedorService.cargarContenedores()
          .subscribe( contenedores => this.contenedores = contenedores );
    this._clienteService.cargarClientes()
          .subscribe( clientes => this.clientes = clientes );
    this._agenciaService.cargarAgencias()
          .subscribe( agencias => this.agencias = agencias );
    this._fleteraService.cargarFleteras()
          .subscribe( fleteras => this.fleteras = fleteras );

  }

  cargarManiobra( id: string ) {
    this._maniobraService.cargarManiobra( id )
          .subscribe( maniobra => {

            console.log( maniobra );
            this.maniobra = maniobra;
            this.maniobra.operador = maniobra.operador._id;
            this.cambioOperador( this.maniobra.operador );
            this.maniobra.camion = maniobra.camiones._id;
            this.cambioCamion( this.maniobra.camion );
            this.maniobra.contenedor = maniobra.contenedor._id;
            this.cambioContenedor( this.maniobra.contenedor );
            this.maniobra.cliente = maniobra.cliente._id;
            this.cambioCliente( this.maniobra.cliente );
            this.maniobra.agencia = maniobra.agencia._id;
            this.cambioAgencia( this.maniobra.agencia );
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

  cambioCamion( id: string ) {

    this._camionService.cargarCamion( id )
          .subscribe( camion => this.camion = camion );

  }

  cambioContenedor( id: string ) {

    this._contenedorService.cargarContenedor( id )
          .subscribe( contenedor => this.contenedor = contenedor );

  }

  cambioCliente( id: string ) {

    this._clienteService.cargarCliente( id )
          .subscribe( cliente => this.cliente = cliente );

  }

  cambioAgencia( id: string ) {

    this._agenciaService.cargarAgencia( id )
          .subscribe( agencia => this.agencia = agencia );

  }

  cambioFletera( id: string ) {

    this._fleteraService.cargarFletera( id )
          .subscribe( fletera => this.fletera = fletera );

  }
  onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }

  cambiarFoto() {

    this._modalDropzoneService.mostrarModal( this.maniobra._id );

  }

}
