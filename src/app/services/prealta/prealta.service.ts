import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Prealta } from '../../models/prealtas.models';
import swal from 'sweetalert';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { Operador } from 'src/app/models/operadores.models';

@Injectable()
export class PrealtaService {

    // tslint:disable-next-line:no-inferrable-types
    totalPrealtas: number = 0;

    constructor(
        public http: HttpClient,
        public _usuarioService: UsuarioService
    ) {}

    cargarPrealtas(desde: number = 0): Observable<any> {

        // tslint:disable-next-line:prefer-const
        let url = URL_SERVICIOS + '/prealta?desde=' + desde;
        return this.http.get(url)
        .pipe(
            map( (resp: any) => {

                this.totalPrealtas = resp.total;
                console.log(resp.total);
                return resp.prealtas;
            })
        );

    }

    cargarPrealta( id: string): Observable<any> {

        // tslint:disable-next-line:prefer-const
        let url = URL_SERVICIOS + '/prealta/' + id;
        return this.http.get(url)
        .pipe ( map((resp: any) => resp.prealta ));

    }

    borrarPrealta( id: string ): Observable<any> {

        let url = URL_SERVICIOS + '/prealta/' + id;
        url += '?token=' + this._usuarioService.token;

        return this.http.delete(url)
        .pipe(map(resp => swal('Prealta Borrado', 'Eliminado Correctamente', 'success')));
    }

    cambioEstado( prealta: Prealta ): Observable<any> {

        let url = URL_SERVICIOS + '/prealta/aprobacion/' + prealta._id;
        url += '?token=' + this._usuarioService.token;
        return this.http.put( url, prealta )
                        .pipe(map((resp: any) => {
                            swal('Prealta Actualizada', prealta.agencia, 'success');
                            return resp.prealta;
                        }),
                        catchError( err => {
                            swal( err.error.mensaje, err.error.errors.message, 'error' );
                              return throwError(err);
                            }));
                        }

    guardarPrealta( prealta: Prealta ): Observable<any> {
        // tslint:disable-next-line: prefer-const
        let url = URL_SERVICIOS + '/prealta';

        if ( prealta._id ) {
            // Actualiazando
            url += '/' + prealta._id;
            url += '?token=' + this._usuarioService.token;

            return this.http.put( url, prealta )
            .pipe(map((resp: any) => {
                swal('Prealta Actualizada', prealta.agencia, 'success');
                return resp.prealta;
            }),
            catchError( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error' );
                  return throwError(err);
                }));
        } else {
            // Creando
            url += '?token=' + this._usuarioService.token;
            return this.http.post( url, prealta )
            .pipe(map((resp: any) => {
                swal('Prealta Creado', prealta.agencia, 'success');
                return resp.prealta;
            }),
            catchError( err => {
                swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError(err);
            }));
        }
    }

    buscarPrealta( termino: string): Observable<any> {
// tslint:disable-next-line: prefer-const
        let url = URL_SERVICIOS + '/busqueda/coleccion/prealta/' + termino;
        return this.http.get( url )
        .pipe(map((resp: any) => resp.prealtas));
    }

}
