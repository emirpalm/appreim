import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Prealta } from '../../models/prealtas.models';
import swal from 'sweetalert';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable()
export class PrealtaService {

    totalPrealtas: number = 0;

    constructor(
        public http: HttpClient,
        public _usuarioService: UsuarioService
    ) {}

    cargarPrealtas(desde: number = 0): Observable<any> {

        let url = URL_SERVICIOS + '/prealta?desde=' + desde;
        return this.http.get(url)
        .pipe(
            map( (resp: any) => {

                this.totalPrealtas = resp.total;
                console.log(resp.total);
                return resp.agencia;
            })
        );

    }

    cargarPrealta( id: string): Observable<any> {

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

}