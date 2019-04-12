import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Buque } from '../../models/buques.models';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable()
export class BuqueService {
  // tslint:disable-next-line:no-inferrable-types
  totalBuques: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarBuques(desde: number = 0): Observable<any> {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/buque?desde=' + desde;
    return this.http.get(url)
    .pipe(
      map( (resp: any) => {

      this.totalBuques = resp.total;
      console.log(resp.total);
    return resp.buques;
    }));
  }

  cargarBuque( id: string ): Observable<any> {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/buque/' + id;
    return this.http.get( url )
    .pipe( map( (resp: any) => resp.buque ));

  }

  cargarBuqueNaviera( id: string ): Observable<any> {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/buque/naviera/' + id;
    return this.http.get( url )
    .pipe( map( (resp: any) => resp.buques));

  }

  borrarBuque( id: string ): Observable<any> {

    let url = URL_SERVICIOS + '/buque/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
    .pipe( map( resp => swal('Buque Borrado', 'Eliminado correctamente', 'success') ));

  }

  guardarBuque( buque: Buque ): Observable<any> {

    let url = URL_SERVICIOS + '/buque';

    if ( buque._id ) {
      // actualizando
      url += '/' + buque._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, buque )
      .pipe(
                map( (resp: any) => {
                  swal('Cliente Actualizado', buque.buque, 'success');
                  return resp.buque;
                }),
                catchError( err => {
                  swal( err.error.mensaje, err.error.errors.message, 'error' );
                  return throwError(err);
                }));

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, buque )
      .pipe(
              map( (resp: any) => {
                swal('Buque Creado', buque.buque, 'success');
                return resp.buque;
              }),
              catchError( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error' );
                return throwError(err);
              }));
    }

  }
  buscarBuque( termino: string ): Observable<any> {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/busqueda/coleccion/buques/' + termino;
    return this.http.get( url )
    .pipe( map( (resp: any) => resp.buques ));

  }


}
