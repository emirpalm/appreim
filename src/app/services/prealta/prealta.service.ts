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
    totalSolicitudesDescarga: number = 0;

    constructor(
        public http: HttpClient,
        public _usuarioService: UsuarioService
    ) {}

    cargarSolicitudes(desde: number = 0): Observable<any> {

        // tslint:disable-next-line:prefer-const
        let url = URL_SERVICIOS + '/solicitudD?desde=' + desde;
        return this.http.get(url)
        .pipe(
            map( (resp: any) => {

                this.totalSolicitudesDescarga = resp.total;
                console.log(resp.total);
                return resp.solicitudesD;
            })
        );

    }

    cargarSolicitudesAgencia( id: string, desde: number = 0): Observable<any> {

        // tslint:disable-next-line:prefer-const
        let url = URL_SERVICIOS + '/solicitudD/' + id;
        url += '?desde=' + desde;
        return this.http.get(url)
        .pipe ( map((resp: any) => {
            this.totalSolicitudesDescarga = resp.total;
            console.log(resp.total);
            return resp.solicitudesD;
        })
    );

 }


    cargarSolicitud( id: string): Observable<any> {

        // tslint:disable-next-line:prefer-const
        let url = URL_SERVICIOS + '/solicitudD/' + id;
        return this.http.get(url)
        .pipe ( map((resp: any) => resp.solicitud ));

    }

    borrarSolicitud( id: string ): Observable<any> {

        let url = URL_SERVICIOS + '/solicitudD/' + id;
        url += '?token=' + this._usuarioService.token;

        return this.http.delete(url)
        .pipe(map(resp => swal('Prealta Borrado', 'Eliminado Correctamente', 'success')));
    }

    cambioEstado( prealta: Prealta ): Observable<any> {

        let url = URL_SERVICIOS + '/solicitudD/aprobacion/' + prealta._id;
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

    guardarSolicitud( prealta: Prealta ): Observable<any> {
        // tslint:disable-next-line: prefer-const
        let url = URL_SERVICIOS + '/solicitudD';

        if ( prealta._id ) {
            // Actualiazando
            url += '/' + prealta._id;
            url += '?token=' + this._usuarioService.token;

            return this.http.put( url, prealta )
            .pipe(map((resp: any) => {
                swal('Solicitud de descarga Actualizada', prealta.agencia, 'success');
                return resp.solicitud;
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
                swal('Solicitud de descarga Creada', prealta.agencia, 'success');
                return resp.solicitud;
            }),
            catchError( err => {
                swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError(err);
            }));
        }
    }

    buscarSolicitud( termino: string): Observable<any> {
// tslint:disable-next-line: prefer-const
        let url = URL_SERVICIOS + '/busqueda/coleccion/solicitudD/' + termino;
        return this.http.get( url )
        .pipe(map((resp: any) => resp.solicitudes));
    }

    cargarBL(archivo: File ): Observable<any> {
        // tslint:disable-next-line:prefer-const
        let formData = new FormData();
        formData.append('file', archivo, archivo.name);
        // tslint:disable-next-line:prefer-const
        let url = URL_SERVICIOS + '/uploadFileTemp';
             // url += '?token=' + this._usuarioService.token;
             return this.http.put( url, formData )
             .pipe(map( (resp: any) => {
               swal('Archivo Cargado', archivo.name, 'success');
               console.log(resp.nombreArchivo);
               return resp.nombreArchivo;
             }),
             catchError( err => {
               swal( err.error.mensaje, err.error.errors.message, 'error' );
               return throwError(err);
             }));
       }

       cargarComprobante(archivo: File ): Observable<any> {
        // tslint:disable-next-line:prefer-const
        let formData = new FormData();
        formData.append('file', archivo, archivo.name);
        // tslint:disable-next-line:prefer-const
        let url = URL_SERVICIOS + '/uploadFileTemp';
             // url += '?token=' + this._usuarioService.token;
             return this.http.put( url, formData )
             .pipe(map( (resp: any) => {
               swal('Archivo Cargado', archivo.name, 'success');
               console.log(resp.nombreArchivo);
               return resp.nombreArchivo;
             }),
             catchError( err => {
               swal( err.error.mensaje, err.error.errors.message, 'error' );
               return throwError(err);
             }));
       }

}
