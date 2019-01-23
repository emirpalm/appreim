import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Fletera } from '../../models/fleteras.models';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable()
export class FleteraService {
  // tslint:disable-next-line:no-inferrable-types
  totalFleteras: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarFleteras(desde: number = 0): Observable<any> {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/fletera?desde=' + desde;
    return this.http.get(url)
    .pipe(map( (resp: any) => {

      this.totalFleteras = resp.total;
      console.log(resp.total);
    return resp.fletera;
    }));
  }

  cargarFletera( id: string ): Observable<any> {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/fletera/' + id;
    return this.http.get( url )
                .pipe(map( (resp: any) => resp.fletera ));

  }

  borrarFletera( id: string ): Observable<any> {

    let url = URL_SERVICIOS + '/fletera/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .pipe(map( resp => swal('Fltera Borrado', 'Eliminado correctamente', 'success') ));

  }

  guardarFletera( fletera: Fletera ): Observable<any> {

    let url = URL_SERVICIOS + '/fletera';

    if ( fletera._id ) {
      // actualizando
      url += '/' + fletera._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, fletera )
                .pipe(map( (resp: any) => {
                  swal('Fletera Actualizado', fletera.cliente, 'success');
                  return resp.fletera;
                }),
                catchError( err => {
                  swal( err.error.mensaje, err.error.errors.message, 'error' );
                  return throwError(err);
                }));

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, fletera )
              .pipe(map( (resp: any) => {
                swal('Fletera Creada', fletera.cliente, 'success');
                return resp.fletera;
              }),
              catchError( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error' );
                return throwError(err);
              }));
    }

  }
  buscarFletera( termino: string ): Observable<any> {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/busqueda/coleccion/fleteras/' + termino;
    return this.http.get( url )
                .pipe(map( (resp: any) => resp.fleteras ));

  }


}
