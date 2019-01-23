import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Agencia } from '../../models/agencias.models';
import swal from 'sweetalert';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable()
export class AgenciaService {
  // tslint:disable-next-line:no-inferrable-types
  totalAgencias: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarAgencias(desde: number = 0): Observable<any> {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/agencia?desde=' + desde;
    return this.http.get(url)
    .pipe(
    map( (resp: any) => {

      this.totalAgencias = resp.total;
      console.log(resp.total);
    return resp.agencia;
    }));
  }

  cargarAgencia( id: string ): Observable<any> {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/agencia/' + id;
    return this.http.get( url )
    .pipe( map( (resp: any) => resp.agencia ));

  }

  borrarAgencia( id: string ): Observable<any> {

    let url = URL_SERVICIOS + '/agencia/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
    .pipe(map( resp => swal('Agencia Borrado', 'Eliminado correctamente', 'success') ));

  }

  guardarAgencia( agencia: Agencia ): Observable<any> { // probar

    let url = URL_SERVICIOS + '/agencia';

    if ( agencia._id ) {
      // actualizando
      url += '/' + agencia._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, agencia )
      .pipe(
                map( (resp: any) => {
                  swal('Agencia Actualizado', agencia.cliente, 'success');
                  return resp.agencia;

                }),
                catchError( err => {
                  swal( err.error.mensaje, err.error.errors.message, 'error' );
                  return throwError(err);
                }));

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, agencia )
      .pipe(
              map( (resp: any) => {
                swal('Agencia Creada', agencia.cliente, 'success');
                return resp.agencia;
              }),
              catchError( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error' );
                return throwError(err);
              }));
    }

  }


  buscarAgencia( termino: string ): Observable<any> {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/busqueda/coleccion/agencias/' + termino;
    return this.http.get( url )
    .pipe(map( (resp: any) => resp.agencias ));

  }



}
