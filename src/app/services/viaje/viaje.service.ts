import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Viaje } from '../../models/viajes.models';
import swal from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class ViajeService {
  // tslint:disable-next-line:no-inferrable-types
  totalViajes: number = 0;
  viaje: Viaje;
  messages: string[] = [];

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarViajes(desde: number = 0) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/viaje?desde=' + desde;
    return this.http.get(url)
    .map( (resp: any) => {

      this.totalViajes = resp.total;
      // console.log(resp.viaje);
    return resp.viaje || [];
    });
  }

  cargarViaje( id: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/viaje/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.viaje  );

  }

  cargarViajeNumero( viaje: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/viaje/numero/' + viaje;
    return this.http.get( url )
                .map( (resp: any) => resp.viaje );

  }


  borrarViaje( id: string ) {

    let url = URL_SERVICIOS + '/viaje/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => swal('Viaje Borrado', 'Eliminado correctamente', 'success') );

  }

  guardarViaje( viaje: Viaje ) {

    let url = URL_SERVICIOS + '/viaje';

    if ( viaje._id ) {
      // actualizando
      url += '/' + viaje._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, viaje )
                .map( (resp: any) => {
                  swal('Viaje Actualizado', viaje.viaje, 'success');
                  return resp.viaje;

                });

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, viaje )
              .map( (resp: any) => {
                swal('Viaje Creado', viaje.viaje, 'success');
                return resp.viaje;
              })
              .catch( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error' );
                return Observable.throw( err );
              });
    }

  }
  buscarViaje( termino: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/busqueda/coleccion/viajes/' + termino;
    return this.http.get( url )
    .map( (resp: any) => resp.viajes );

}

actualizarContenedor(viaje: Viaje ) {

  let url = URL_SERVICIOS + '/viaje/add/' + viaje._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, viaje )
                .map( (resp: any) => {
                  swal('Viaje Actualizado', viaje.viaje, 'success');
                  return resp.viaje;

                });

    }


removerContenedor(id: string, viaje: Viaje ) {
  let url = URL_SERVICIOS + '/viaje/remove/' + id + '&' + viaje;
  url += '?token=' + this._usuarioService.token;
      return this.http.put( url, viaje )
                .map( (resp: any) => {
                  swal('Viaje Actualizado', 'success');
                  // console.log(resp.viaje);
                  return resp.viaje;

                });

}


}

