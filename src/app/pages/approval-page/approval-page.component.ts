import { Component, OnInit } from '@angular/core';
import { Prealta } from '../../models/prealtas.models';
import { PrealtaService } from '../../services/service.index';
import { Usuario } from '../../models/usuarios.model';
import { UsuarioService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

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
    this._prealtaService.cargarSolicitud(id)
    .subscribe(solicitud => this.solicitud = solicitud );
  }

  guardarPrealta(prealta: Prealta) {
    this._prealtaService.guardarSolicitud(prealta)
    .subscribe(resp => {
     // this.cargarSolicitudes();
    });

  }

  cambioEstado(prealta: Prealta) {
    this._prealtaService.cambioEstado(prealta)
    .subscribe(resp => {
     // this.cargarSolicitudes();
    });
  }




}
