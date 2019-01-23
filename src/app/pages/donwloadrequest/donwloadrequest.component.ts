import { Component, OnInit } from '@angular/core';
import { Agencia } from '../../models/agencias.models';
import { AgenciaService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuarios.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-donwloadrequest',
  templateUrl: './donwloadrequest.component.html',
  styles: []
})
export class DonwloadrequestComponent implements OnInit {

  usuario: Usuario;
  agencias: Agencia[] = [];
  agencia: Agencia = new Agencia('', '');

  constructor(
    public _usuarioService: UsuarioService,
    public _agenciaService: AgenciaService
  ) {
    this.usuario = this._usuarioService.usuario;
    console.log(this.usuario);
    // this.agencia = this._agenciaService;
   }

  ngOnInit() {
  }


}
