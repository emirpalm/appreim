import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Agencia } from '../../models/agencias.models';
import { AgenciaService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuarios.model';
import { UsuarioService } from '../../services/service.index';
import { Naviera } from '../../models/navieras.models';
import { NavieraService } from '../../services/service.index';
import { Fletera } from '../../models/fleteras.models';
import { FleteraService } from '../../services/service.index';
import { Cliente } from '../../models/clientes.models';
import { ClienteService } from '../../services/service.index';
import { Prealta } from '../../models/prealtas.models';
import { PrealtaService } from '../../services/service.index';
import { Contenedor } from 'src/app/models/contenedores.models';
import swal from 'sweetalert';

// tslint:disable-next-line:class-name
export interface datos {
  contenedor: string;
  tipo: string;
  estado: string;
  servicio: string;
}


@Component({
  selector: 'app-donwloadrequest',
  templateUrl: './donwloadrequest.component.html',
  styleUrls: ['donwloadrequest.component.css']
})
export class DonwloadrequestComponent implements OnInit {

  forma: FormGroup;
  usuario: Usuario;
  prealtas: Prealta[] = [];
  prealta: Prealta = new Prealta('', '');
  agencias: Agencia[] = [];
  agencia: Agencia = new Agencia('', '');
  navieras: Naviera[] = [];
  naviera: Naviera = new Naviera('');
  fleteras: Fletera[] = [];
  fletera: Fletera = new Fletera('');
  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente('');
  profile: Usuario = new Usuario('');
  desde = 0;
  facturaa: string;
  facturas: string[] = ['Agencia Aduanal', 'Otro'];
  formasPago: string;
  pagos: string[] = ['Comprobante de pago', 'Ya cuenta con crédito'];
  contenedores: datos[] = [];
  // tslint:disable-next-line:quotemark
  selectedTipo = "Contenedor Estandar 20'";
  selectedEstado = 'Vacio';
  selectedServicio = 'Lavado';

  constructor(
    public _usuarioService: UsuarioService,
    public _agenciaService: AgenciaService,
    public _navieraService: NavieraService,
    public _fleteraService: FleteraService,
    public _clienteService: ClienteService,
    public _prealtaService: PrealtaService,
    public router: Router
  ) {
    this.usuario = this._usuarioService.usuario;
    console.log(this.usuario);
    // this.agencia = this._agenciaService;
   }

  ngOnInit() {
    this.cargarNavieras();
    this.cargarFleteras();
    this.forma = new FormGroup({
      agencia: new FormControl(null, Validators.required ),
      naviera: new FormControl(null, [Validators.required] ),
      transportista: new FormControl(null, Validators.required ),
      facturarA: new FormControl(null, Validators.required ),
      observaciones: new FormControl(null, Validators.required ),
      credito: new FormControl(null, Validators.required),
      correo: new FormControl(null, Validators.required ),
      correoFac: new FormControl(null, Validators.required ),
      contenedores: new FormControl(this.contenedores)
    });
  }
  cargarNavieras() {
    // this.cargando = true;
    this._navieraService.cargarNavieras(this.desde)
    .subscribe(navieras =>
      this.navieras = navieras
      );
  }

  cargarFleteras() {
    // this.cargando = true;
    this._fleteraService.cargarFleteras(this.desde)
    .subscribe(fleteras =>
      // this.totalRegistros = resp.total;
      this.fleteras = fleteras

    );
  }

  cargarDatos( id: string ) {
   // console.log(id);
    // this.cargando = true;
    this._clienteService.cargarClientesEmpresa( id )
          .subscribe( clientes => {

            console.log( clientes );
            this.clientes = clientes;
            // this.cliente.usuario = cliente.usuario._id;
          });
    this._agenciaService.cargarAgencia( id )
          .subscribe( agencia => {

            console.log( agencia );
            this.agencia = agencia;
            // this.agencia.usuario = agencia.usuario._id;
          });
  }

  anadirContenedores(value: string) {

     // console.log(value);
    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:triple-equals
    let index = this.contenedores.find( dato => dato.contenedor == value);

    // tslint:disable-next-line:triple-equals
    if (value == '') {
      swal( 'Error esta vacio', 'No fue posible insertar', 'error' );
      // console.log('Error esta vacio');
      return;
     }
     if (index != null) {
      swal( 'Error Contenedor Duplicado', 'No fue posible insertar: ' + index.contenedor, 'error' );
      // console.log('Contenedor duplicado ' + index.contenedor);
     } else {
      // tslint:disable-next-line:max-line-length
      this.contenedores.push({contenedor: value, tipo: this.selectedTipo, estado: this.selectedEstado, servicio: this.selectedServicio});
     }

}

  remover(element: any) {
    console.log(element);
     let index = this.contenedores.find( dato => dato.contenedor == element);
      // tslint:disable-next-line: prefer-const
     let index2 = this.contenedores.indexOf(index);
       console.log(index2);
       if (index2 >= -1) {
      this.contenedores.splice(index2, 1);
    }
}

  guardarPrealta( ) {
   // console.log(this.datos);
   if ( this.forma.invalid ) {
    return;
  }
  // tslint:disable-next-line:prefer-const
  let prealta = new Prealta(
    this.forma.value.agencia,
    this.forma.value.naviera,
    this.forma.value.transportista,
    this.forma.value.facturarA,
    this.forma.value.observaciones,
    this.forma.value.credito,
    this.forma.value.correo,
    this.forma.value.correoFac,
    this.forma.value.contenedores
  );
  console.log(prealta);

  this._prealtaService.guardarPrealta(prealta)
    // tslint:disable-next-line:no-shadowed-variable
    .subscribe( prealta => {
    this.prealta._id = prealta._id;
    // this.router.navigate(['/prealta', prealta._id]);
  });
  
}

}
