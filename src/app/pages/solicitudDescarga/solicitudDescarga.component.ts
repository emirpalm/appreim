import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Agencia } from '../../models/agencias.models';
import { AgenciaService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuarios.model';
import { UsuarioService } from '../../services/service.index';
import { Naviera } from '../../models/navieras.models';
import { NavieraService } from '../../services/service.index';
import { Fletera } from '../../models/fleteras.models';
import { FleteraService } from '../../services/service.index';
import { Cliente } from '../../models/clientes.models';
import { ClienteService } from '../../services/service.index';
import { Prealta } from '../../models/prealtas.models';
import { PrealtaService } from '../../services/service.index';
import { Buque } from '../../models/buques.models';
import { BuqueService } from '../../services/service.index';
import { Viaje } from '../../models/viajes.models';
import { ViajeService } from '../../services/service.index';
import swal from 'sweetalert';

// tslint:disable-next-line:class-name
export interface datos {
  Contenedor: string;
  Tipo: string;
  Estado: string;
}


@Component({
  selector: 'app-solicitude-descarga',
  templateUrl: './solicitudDescarga.component.html',
  styleUrls: ['solicitudDescarga.component.css']
})

export class SolicitudDescargaComponent implements OnInit {

  fileBL: File;
  fileComprobante: File;
  usuario: Usuario;
  prealtas: Prealta[] = [];
  prealta: Prealta = new Prealta('');
  agencias: Agencia[] = [];
  agencia: Agencia = new Agencia('');
  navieras: Naviera[] = [];
  naviera: Naviera = new Naviera('');
  buques: Buque[] = [];
  buque: Buque = new Buque('');
  viajes: Viaje[] = [];
  viaje: Viaje = new Viaje('');
  fleteras: Fletera[] = [];
  fletera: Fletera = new Fletera('');
  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente('');
  profile: Usuario = new Usuario('');
  desde = 0;
  facturaa: string;
  facturas: string[] = ['Agencia Aduanal', 'Otro'];
  formasPago: string;
  pagos: string[] = ['Comprobante de pago', 'Ya cuenta con crédito'];
  contenedores: datos[] = [];
  // tslint:disable-next-line:quotemark
  selectedTipo = "Contenedor Estandar 20'";
  selectedEstado = 'Vacio';
  selectedServicio = 'Lavado';
  selectedNaviera = '';

  constructor(
    public _usuarioService: UsuarioService,
    public _agenciaService: AgenciaService,
    public _navieraService: NavieraService,
    public _fleteraService: FleteraService,
    public _clienteService: ClienteService,
    public _prealtaService: PrealtaService,
    public _buqueService: BuqueService,
    public _viajeService: ViajeService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    this.usuario = this._usuarioService.usuario;
    activatedRoute.params.subscribe( params => {

      // tslint:disable-next-line:prefer-const
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarSolicitud( id );
      }

    });
    // console.log(this.usuario);
    // this.agencia = this._agenciaService;
   }

   cargarSolicitud( id: string ) {
    this._prealtaService.cargarSolicitud( id )
          .subscribe( solicitud => {

            console.log( solicitud );
            this.prealta = solicitud;
            this.contenedores = solicitud.contenedores;
            this.prealta.agencia = solicitud.agencia._id;
            this.cargarDatos( this.prealta.agencia );
            this.prealta.naviera = solicitud.naviera._id;
            this.cargarBuqueNaviera( this.prealta.naviera );
            // this.viaje.contenedor = viaje.contenedor._id;
            // this.cambioContenedor( this.viaje.contenedor );
            this.prealta.transportista = solicitud.transportista._id;
            this.cambioFletera( this.prealta.transportista );
            //this.camion.usuario = camion.usuario._id;
          });
  }

  ngOnInit() {
    this._navieraService.cargarNavieras()
    .subscribe( navieras => {
      this.navieras = navieras;
    });
    this._fleteraService.cargarFleteras()
    .subscribe( fleteras => this.fleteras = fleteras );
    // this.cargarViajes();
  }

  cambioFletera( id: string ) {

    this._fleteraService.cargarFletera( id )
          .subscribe( fletera => this.fletera = fletera );

  }

  cargarViajes() {
    this._viajeService.cargarViajes(this.desde)
    .subscribe(viajes =>
    this.viajes = viajes

    );
  }

  cargarBuqueNaviera(id: string) {
    this._buqueService.cargarBuqueNaviera( id )
    .subscribe( buques => this.buques = buques);
  }

  cargarDatos( id: string ) {
   // console.log(id);
    // this.cargando = true;
    this._clienteService.cargarClientesEmpresa( id )
          .subscribe( clientes => {

            console.log( clientes );
            this.clientes = clientes;
            // this.cliente.usuario = cliente.usuario._id;
          });
    this._agenciaService.cargarAgencia( id )
          .subscribe( agencia => {

            console.log( agencia );
            this.agencia = agencia;
            // this.agencia.usuario = agencia.usuario._id;
          });
  }

  anadirContenedores(contenedor: string) {
       // console.log(value);
    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:triple-equals
    let index = this.contenedores.find( dato => dato.Contenedor == contenedor);

    // tslint:disable-next-line:triple-equals
    if (contenedor == '') {
      swal( 'Error esta vacio', 'No fue posible insertar', 'error' );
      // console.log('Error esta vacio');
      return;
     }
     if (index != null) {
      swal( 'Error Contenedor Duplicado', 'No fue posible insertar: ' + index.Contenedor, 'error' );
      // console.log('Contenedor duplicado ' + index.contenedor);
     } else {
      // tslint:disable-next-line:max-line-length
      this.contenedores.push({Contenedor: contenedor, Tipo: this.selectedTipo, Estado: this.selectedEstado});
    }

}

  remover(element: any) {
    console.log(element);
     let index = this.contenedores.find( dato => dato.Contenedor == element);
      // tslint:disable-next-line: prefer-const
     let index2 = this.contenedores.indexOf(index);
       console.log(index2);
       if (index2 >= -1) {
      this.contenedores.splice(index2, 1);
    }
}

guardarSolicitud( f: NgForm ) {
   // console.log(this.datos);
   if ( f.invalid ) {
    return;
  }

  this.prealta.contenedores = this.contenedores;

  console.log(this.prealta);

  this._prealtaService.guardarSolicitud(this.prealta)
    // tslint:disable-next-line:no-shadowed-variable
    .subscribe( solicitud => {
   //  this.prealta._id = prealta._id;
    // this.router.navigate(['/prealta', prealta._id]);
  });
}

seleccionBL(archivo: File) {
  console.log(archivo);

   if (!archivo) {
     this.fileBL = null;
     return;
   }
   if (archivo.type.indexOf('image') < 0 && archivo.type.indexOf('pdf') < 0) {
     swal('Solo Archivos De Imagen', 'El archivo seleccionado no tiene formato Imagen', 'error');
     this.fileBL = null;
     return;

   }

      this.fileBL = archivo;

      this._prealtaService.cargarComprobante(this.fileBL)
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe( nombreArchivo => {
        this.prealta.rutaBL = nombreArchivo;
        console.log(this.prealta.rutaBL);
    });
 }

 seleccionComprobante(archivo: File) {
  console.log(archivo);

   if (!archivo) {
     this.fileComprobante = null;
     return;
   }
   if (archivo.type.indexOf('image') < 0 && archivo.type.indexOf('pdf') < 0) {
     swal('Solo Archivos De Imagen', 'El archivo seleccionado no tiene formato Imagen', 'error');
     this.fileComprobante = null;
     return;

   }

      this.fileComprobante = archivo;

      this._prealtaService.cargarComprobante(this.fileComprobante)
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe( nombreArchivo => {
        this.prealta.rutaComprobante = nombreArchivo;
        console.log(this.prealta.rutaComprobante);
    });
 }

}
