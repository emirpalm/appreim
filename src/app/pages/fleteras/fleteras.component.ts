import { Component, OnInit } from '@angular/core';
import { Fletera } from '../../models/fleteras.models';
import { FleteraService } from '../../services/service.index';

@Component({
  selector: 'app-fleteras',
  templateUrl: './fleteras.component.html',
  styles: []
})
export class FleterasComponent implements OnInit {
  // tslint:disable-next-line:typedef-whitespace
  fleteras : Fletera[] = [];
  // tslint:disable-next-line:no-inferrable-types
  cargando: boolean = true;
  // tslint:disable-next-line:no-inferrable-types
  totalRegistros: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  desde: number = 0;

  constructor(public _fleteraService: FleteraService) { }

  ngOnInit() {
    this.cargarFleteras();
  }
  cargarFleteras() {
    this.cargando = true;
    this._fleteraService.cargarFleteras(this.desde)
    .subscribe(fleteras =>
      // this.totalRegistros = resp.total;
      this.fleteras = fleteras

    );
  }

  cambiarDesde(valor: number) {
    // tslint:disable-next-line:prefer-const
    let desde = this.desde + valor;
    console.log(desde);
    if (desde >= this._fleteraService.totalFleteras) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarFleteras();

  }

  buscarFletera(termino: string) {
    if (termino.length <= 0) {
      this.cargarFleteras();
      return;
    }
    this.cargando = true;
    this._fleteraService.buscarFletera(termino)
    .subscribe((fleteras: Fletera[]) => {
      this.fleteras = fleteras;
      this.cargando = false;

    });
  }

  borrarFletera( fletera: Fletera ) {

    this._fleteraService.borrarFletera( fletera._id )
            .subscribe( () =>  this.cargarFleteras() );

  }

}
