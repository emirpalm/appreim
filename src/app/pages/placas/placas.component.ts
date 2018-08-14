import { Component, OnInit } from '@angular/core';
import { Placa } from '../../models/placas.models';
import { PlacaService } from '../../services/service.index';

@Component({
  selector: 'app-placas',
  templateUrl: './placas.component.html',
  styles: []
})
export class PlacasComponent implements OnInit {
  // tslint:disable-next-line:typedef-whitespace
  placas : Placa[] = [];
  // tslint:disable-next-line:no-inferrable-types
  cargando: boolean = true;
  // tslint:disable-next-line:no-inferrable-types
  totalRegistros: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  desde: number = 0;
  constructor(public _placaService: PlacaService) { }

  ngOnInit() {
    this.cargarPlacas();
  }

  cargarPlacas() {
    this.cargando = true;
    this._placaService.cargarPlacas(this.desde)
    .subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.placas = resp.placas;
      this.cargando = false;
      console.log(this.totalRegistros);
    });
  }

  cambiarDesde(valor: number) {
    // tslint:disable-next-line:prefer-const
    let desde = this.desde + valor;
    console.log(desde);
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarPlacas();

  }

  buscarPlaca(termino: string) {
    if (termino.length <= 0) {
      this.cargarPlacas();
      return;
    }
    this.cargando = true;
    this._placaService.buscarPlaca(termino)
    .subscribe((placas: Placa[]) => {
      this.placas = placas;
      this.cargando = false;

    });
  }

  borrarPlaca( placas: Placa ) {

    this._placaService.borrarPlaca( placas._id )
            .subscribe( () =>  this.cargarPlacas() );

  }

}
