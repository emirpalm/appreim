import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Contenedor } from '../../models/contenedores.models';

import swal from 'sweetalert';

@Injectable()
export class ContenedorService {
  // tslint:disable-next-line:no-inferrable-types
  totalContenedores: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarContenedores(desde: number = 0) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/contenedor?desde=' + desde;
    return this.http.get(url)
    .map( (resp: any) => {

      this.totalContenedores = resp.total;
      // console.log(resp.total);
    return resp.contenedor;
    });
  }

  cargarContenedor( id: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/contenedor/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.contenedor );

  }

  borrarContenedor( id: string ) {

    let url = URL_SERVICIOS + '/contenedor/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => swal('Contenedor Borrado', 'Eliminado correctamente', 'success') );

  }

  guardarContenedor( contenedor: Contenedor ) {

    let url = URL_SERVICIOS + '/contenedor';

    if ( contenedor._id ) {
      // actualizando
      url += '/' + contenedor._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, contenedor )
                .map( (resp: any) => {
                  swal('Contenedor Actualizado', contenedor.contenedor, 'success');
                  return resp.contenedor;

                });

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, contenedor )
              .map( (resp: any) => {
                swal('Contenedor Creado', contenedor.contenedor, 'success');
                return resp.contenedor;
              });
    }

  }
  buscarContenedor( termino: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/busqueda/coleccion/contenedores/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.contenedores );

  }


}
