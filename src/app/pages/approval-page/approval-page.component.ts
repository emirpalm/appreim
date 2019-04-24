import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Prealta } from '../../models/prealtas.models';
import { PrealtaService } from '../../services/service.index';
import { Usuario } from '../../models/usuarios.model';
import { UsuarioService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { Agencia } from '../../models/agencias.models';

// tslint:disable-next-line:class-name
export interface datos {
  Contenedor: string;
  Tipo: string;
  Estado: string;
  Maniobra: string;
}


@Component({
  selector: 'app-approval-page',
  templateUrl: './approval-page.component.html',
  styles: []
})
export class ApprovalPageComponent implements OnInit {
  usuario: Usuario;
  solicitudes: Prealta[] = [];
  solicitud: Prealta = new Prealta('');
  // prealta: Prealta = new Prealta('', '');
  // tslint:disable-next-line:no-inferrable-types
  cargando: boolean = true;
  // tslint:disable-next-line:no-inferrable-types
  totalRegistros: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  desde: number = 0;
  checked = false;
  contenedores: datos[] = [];
  agencia: string;
  naviera: string;
  transportista: string;
  cliente: string;
  buque: string;
  idbuque: string;
  maniobra: string;

  constructor( public _usuarioService: UsuarioService,
    public _prealtaService: PrealtaService,
    public activatedRoute: ActivatedRoute,
    public router: Router ) {
    this.usuario = this._usuarioService.usuario;
    activatedRoute.params.subscribe( params => {

      // tslint:disable-next-line:prefer-const
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarSolicitud( id );
      }

    });
  }

  ngOnInit() {
  }

  cargarSolicitud(id: string) {
    this.cargando = true;
    this._prealtaService.cargarSolicitud( id )
          .subscribe( solicitud => {
            console.log(solicitud);
            this.agencia = solicitud.agencia.razonSocial;
            this.naviera = solicitud.agencia.razonSocial;
            this.transportista = solicitud.transportista.razonSocial;
            this.cliente = solicitud.cliente.razonSocial;
            this.buque = solicitud.buque.buque;
            this.idbuque = solicitud.buque._id;
            this.solicitud = solicitud;
            this.contenedores = solicitud.contenedores;
            this.buscarManiobra();
          });
  }

  buscarManiobra() {
      this.contenedores.forEach( contenedor => {
      this._prealtaService.cargarManiobraID(contenedor.Contenedor, this.solicitud.viaje, this.idbuque)
      .subscribe( maniobra => {
        contenedor.Maniobra = maniobra[0]._id;
        console.log(maniobra);
      });
      /* console.log(contenedor.Contenedor);
      console.log(this.solicitud.viaje);
      console.log(this.idbuque)*/
    });
  }

  updateSolicitud( f: NgForm ) {
    if ( f.invalid ) {
      return;
      }
    this.solicitud.contenedores = this.contenedores;
   console.log(this.solicitud);
   this._prealtaService.guardarSolicitudManiobra(this.solicitud)
   .subscribe(solicitud => {
    // console.log(solicitud);
   });

  }

  cambioEstado(prealta: Prealta) {
    this._prealtaService.cambioEstado(prealta)
    .subscribe(resp => {
     // this.cargarSolicitudes();
    });
  }




}
