import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Maniobra } from '../../models/maniobras.models';

import swal from 'sweetalert';

@Injectable()
export class ManiobraService {
  // tslint:disable-next-line:no-inferrable-types
  totalManiobras: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarManiobras(desde: number = 0) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/maniobra?desde=' + desde;
    return this.http.get( url )
    .map( (resp: any) => {

      this.totalManiobras = resp.total;
      console.log(resp.maniobras);
    return resp.maniobras;
    });
  }

  cargarManiobra( id: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/maniobra/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.maniobras );

  }

  borrarManiobra( id: string ) {

    let url = URL_SERVICIOS + '/maniobra/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => swal('Maniobra Borrado', 'Eliminado correctamente', 'success') );

  }

  guardarManiobra( maniobra: Maniobra ) {

    let url = URL_SERVICIOS + '/maniobra';

    if ( maniobra._id ) {
      // actualizando
      url += '/' + maniobra._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, maniobra )
                .map( (resp: any) => {
                  swal('Maniobra Actualizado', 'test', 'success');
                  return resp.maniobra;

                });

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, maniobra )
              .map( (resp: any) => {
                swal('Contenedor Creado', 'test', 'success');
                return resp.maniobra;
              });
    }

  }
  buscarManiobra( termino: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/busqueda/coleccion/maniobras/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.maniobras );

  }

  buscarManiobraFecha( fechaIncio: string, fechaFin: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/maniobra/rangofecha?fechaInicio=' + fechaIncio + '&fechaFin=' + fechaFin;
    return this.http.get( url )
                .map( (resp: any) => resp.maniobras );

  }


}
