import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Placa } from '../../models/placas.models';

import swal from 'sweetalert';

@Injectable()
export class PlacaService {
  // tslint:disable-next-line:no-inferrable-types
  totalPlacas: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarPlacas(desde: number = 0) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/placas?desde=' + desde;
    return this.http.get(url);
  }

  cargarPlaca( id: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/placas/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.placas );

  }

  borrarPlaca( id: string ) {

    let url = URL_SERVICIOS + '/placas/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => swal('Placa Borrada', 'Eliminado correctamente', 'success') );

  }

  guardarPlaca( placa: Placa ) {

    let url = URL_SERVICIOS + '/placas';

    if ( placa._id ) {
      // actualizando
      url += '/' + placa._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, placa )
                .map( (resp: any) => {
                  swal('Placa Actualizada', placa.placa, 'success');
                  return resp.placa;

                });

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, placa )
              .map( (resp: any) => {
                swal('Placa Creada', placa.placa, 'success');
                return resp.placa;
              });
    }

  }
  buscarPlaca( termino: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/busqueda/coleccion/placas/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.placas );

  }


}
