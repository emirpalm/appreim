import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Fletera } from '../../models/fleteras.models';

import swal from 'sweetalert';

@Injectable()
export class FleteraService {
  // tslint:disable-next-line:no-inferrable-types
  totalFleteras: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarFleteras(desde: number = 0) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/fletera?desde=' + desde;
    return this.http.get(url)
    .map( (resp: any) => {

      this.totalFleteras = resp.total;
      console.log(resp.total);
    return resp.fletera;
    });
  }

  cargarFletera( id: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/fletera/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.fletera );

  }

  borrarFletera( id: string ) {

    let url = URL_SERVICIOS + '/fletera/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => swal('Fltera Borrado', 'Eliminado correctamente', 'success') );

  }

  guardarFletera( fletera: Fletera ) {

    let url = URL_SERVICIOS + '/fletera';

    if ( fletera._id ) {
      // actualizando
      url += '/' + fletera._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, fletera )
                .map( (resp: any) => {
                  swal('Fletera Actualizado', fletera.nombre, 'success');
                  return resp.fletera;

                });

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, fletera )
              .map( (resp: any) => {
                swal('Fletera Creada', fletera.nombre, 'success');
                return resp.fletera;
              });
    }

  }
  buscarFletera( termino: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/busqueda/coleccion/fleteras/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.fleteras );

  }


}
