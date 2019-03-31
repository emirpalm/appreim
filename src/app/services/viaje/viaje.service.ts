import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Viaje } from '../../models/viajes.models';
import swal from 'sweetalert';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';


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

  cargarViajes(desde: number = 0): Observable<any> {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/viaje?desde=' + desde;
    return this.http.get(url)
    .pipe(map( (resp: any) => {

      this.totalViajes = resp.total;
     // console.log(resp.viaje);
    return resp.viaje;
    }));
  }

  cargarViaje( id: string ): Observable<any> {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/viaje/' + id;
    return this.http.get( url )
                .pipe(map( (resp: any) => resp.viaje  ));

  }

  cargarViajeNumero( viaje: string ): Observable<any> {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/viaje/numero/' + viaje;
    return this.http.get( url )
                .pipe(map( (resp: any) => resp.viaje ));

  }


  borrarViaje( id: string ): Observable<any> {

    let url = URL_SERVICIOS + '/viaje/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .pipe(map( resp => swal('Viaje Borrado', 'Eliminado correctamente', 'success') ));

  }

  guardarViaje( viaje: Viaje ): Observable<any> {

    let url = URL_SERVICIOS + '/viaje';

    if ( viaje._id ) {
      // actualizando
      url += '/' + viaje._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, viaje )
                .pipe(map( (resp: any) => {
                  swal('Viaje Actualizado', viaje.viaje, 'success');
                  return resp.viaje;
                }),
                catchError( err => {
                  swal( err.error.mensaje, err.error.errores.message, 'error' );
                  return throwError(err);
                }));

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, viaje )
              .pipe(map( (resp: any) => {
                swal('Viaje Creado', viaje.viaje, 'success');
                return resp.viaje;
              }),
              catchError( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error' );
                return throwError( err );
              }));
    }

  }
  buscarViaje( termino: string ): Observable<any> {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/busqueda/coleccion/viajes/' + termino;
    return this.http.get( url )
    .pipe(map( (resp: any) => resp.viajes ));

}

actualizarContenedor(viaje: Viaje ): Observable<any> {

  let url = URL_SERVICIOS + '/viaje/add/' + viaje._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, viaje )
                .pipe(map( (resp: any) => {
                  swal('Viaje Actualizado', viaje.viaje, 'success');
                  return resp.viaje;

                }),
                catchError( err => {
                  swal( err.error.mensaje, err.error.errors.message, 'error' );
                  return throwError(err);
                }));

    }


removerContenedor(id: string, viaje: Viaje ): Observable<any> {
  let url = URL_SERVICIOS + '/viaje/remove/' + id + '&' + viaje;
  url += '?token=' + this._usuarioService.token;
      return this.http.put( url, viaje )
                .pipe(map( (resp: any) => {
                  swal('Viaje Actualizado', 'success');
                  // console.log(resp.viaje);
                  return resp.viaje;

                }),
                catchError( err => {
                  swal( err.error.mensaje, err.error.errors.message, 'error' );
                  return throwError(err);
                }));

}


}

