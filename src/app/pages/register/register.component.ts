import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuarios.model';
import * as swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {

      // tslint:disable-next-line:prefer-const
      let pass1 = group.controls[campo1].value;
      // tslint:disable-next-line:prefer-const
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }


  ngOnInit() {
      init_plugins();

      this.forma = new FormGroup({
        nombre: new FormControl( null , Validators.required ),
        email: new FormControl( null , [Validators.required, Validators.email] ),
        password: new FormControl( null , Validators.required ),
        password2: new FormControl( null , Validators.required )
      }, { validators: this.sonIguales( 'password', 'password2' )  } );


      this.forma.setValue({
        nombre: 'Test ',
        email: 'test@test.com',
        password: '123456',
        password2: '123456'
      });

  }


  registrarUsuario() {

    if ( this.forma.invalid ) {
      return;
    }


    // tslint:disable-next-line:prefer-const
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario( usuario )
              .subscribe( resp => this.router.navigate(['/login']));


  }

}
