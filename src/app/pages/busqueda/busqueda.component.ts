import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuarios.model';
import { Operador } from '../../models/operadores.models';
import { Camion } from '../../models/camiones.models';
import { Cliente } from '../../models/clientes.models';
import { Contenedor } from '../../models/contenedores.models';
import { Agencia } from '../../models/agencias.models';
import { Fletera } from '../../models/fleteras.models';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  operadores: Operador[] = [];
  camiones: Camion[] = [];
  contenedores: Contenedor[] = [];
  clientes: Cliente[] = [];
  agencias: Agencia[] = [];
  fleteras: Fletera[] = [];


  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {

    activatedRoute.params
      .subscribe( params => {
        // tslint:disable-next-line:prefer-const
        let termino = params['termino'];
        this.buscar( termino );
      });

  }

  ngOnInit() {
  }

  buscar( termino: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get( url )
        .subscribe( (resp: any) => {

          console.log( resp );
          this.operadores = resp.operadores;
          this.camiones = resp.camiones;
          this.contenedores = resp.contenedores;
          this.clientes = resp.clientes;
          this.agencias = resp.agencias;
          this.fleteras = resp.fleteras;
          this.usuarios = resp.usuarios;
        });

  }

}
