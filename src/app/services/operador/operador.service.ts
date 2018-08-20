import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Operador } from '../../models/operadores.models';

import swal from 'sweetalert';

@Injectable()
export class OperadorService {
  // tslint:disable-next-line:no-inferrable-types
  totalOperadores: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarOperadores(desde: number = 0) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/operador?desde=' + desde;
    return this.http.get(url)
    .map( (resp: any) => {

      this.totalOperadores = resp.total;
      console.log(resp.total);
    return resp.operadores;
    });
  }

  cargarOperador( id: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/operador/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.operadores );

  }

  borrarOperador( id: string ) {

    let url = URL_SERVICIOS + '/operador/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => swal('Operador Borrado', 'Eliminado correctamente', 'success') );

  }


  guardarOperador( operador: Operador ) {

    let url = URL_SERVICIOS + '/operador';

    if ( operador._id ) {
      // actualizando
      url += '/' + operador._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, operador )
                .map( (resp: any) => {
                  swal('Operador Actualizado', operador.operador, 'success');
                  return resp.operador;

                });

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, operador )
              .map( (resp: any) => {
                swal('Operador Creado', operador.operador, 'success');
                return resp.operador;
              });
    }

  }
  buscarOperador( termino: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/busqueda/coleccion/operadores/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.operadores );

  }


}
