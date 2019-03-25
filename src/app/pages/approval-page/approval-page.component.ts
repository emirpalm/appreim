import { Component, OnInit } from '@angular/core';
import { Prealta } from '../../models/prealtas.models';
import { PrealtaService } from '../../services/service.index';

@Component({
  selector: 'app-approval-page',
  templateUrl: './approval-page.component.html',
  styles: []
})
export class ApprovalPageComponent implements OnInit {

  prealtas: Prealta[] = [];
  // prealta: Prealta = new Prealta('', '');
  // tslint:disable-next-line:no-inferrable-types
  cargando: boolean = true;
  // tslint:disable-next-line:no-inferrable-types
  totalRegistros: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  desde: number = 0;
  checked = false;

  constructor( public _prealtaService: PrealtaService ) {}

  ngOnInit() {
    this.cargarPrealtas();
  }

  cargarPrealtas() {
    this.cargando = true;
    this._prealtaService.cargarPrealtas(this.desde)
    .subscribe(prealtas => this.prealtas = prealtas );
  }

  guardarPrealta(prealta: Prealta) {
    this._prealtaService.guardarPrealta(prealta)
    .subscribe(resp => {
      this.cargarPrealtas();
    });

  }

  cambioEstado(prealta: Prealta) {
    this._prealtaService.cambioEstado(prealta)
    .subscribe(resp => {
      this.cargarPrealtas();
    });
  }

  cambiarDesde(valor: number) {
    // tslint:disable-next-line:prefer-const
    let desde = this.desde + valor;
    console.log(desde);
    if (desde >= this._prealtaService.totalPrealtas) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarPrealtas();
  }

  buscarPrealta(termino: string) {
    if (termino.length <=0) {
      this.cargarPrealtas();
      return;
    }
    this.cargando = true;
    this._prealtaService.buscarPrealta(termino)
    .subscribe( prealtas => this.prealtas = prealtas);
  }

  borrarPrealta(prealta: Prealta) {

    this._prealtaService.borrarPrealta( prealta._id )
    .subscribe( () =>  this.cargarPrealtas() );
  }

}
