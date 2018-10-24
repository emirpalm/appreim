import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Cliente } from '../../models/clientes.models';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable()
export class ClienteService {
  // tslint:disable-next-line:no-inferrable-types
  totalClientes: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarClientes(desde: number = 0) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/cliente?desde=' + desde;
    return this.http.get(url)
    .pipe(
    map( (resp: any) => {

      this.totalClientes = resp.total;
      console.log(resp.total);
    return resp.cliente;
    }));
  }

  cargarCliente( id: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/cliente/' + id;
    return this.http.get( url )
              .pipe( map( (resp: any) => resp.cliente ));

  }

  borrarCliente( id: string ) {

    let url = URL_SERVICIOS + '/cliente/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .pipe( map( resp => swal('Cliente Borrado', 'Eliminado correctamente', 'success') ));

  }

  guardarCliente( cliente: Cliente ) {

    let url = URL_SERVICIOS + '/cliente';

    if ( cliente._id ) {
      // actualizando
      url += '/' + cliente._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, cliente )
                .pipe (map( (resp: any) => {
                  swal('Cliente Actualizado', cliente.cliente, 'success');
                  return resp.cliente;

                }));

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, cliente )
              .pipe(map( (resp: any) => {
                swal('Cliente Creado', cliente.cliente, 'success');
                return resp.cliente;
              }));
    }

  }
  buscarCliente( termino: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/busqueda/coleccion/clientes/' + termino;
    return this.http.get( url )
                .pipe(map( (resp: any) => resp.clientes ));

  }


}
