import { Component, OnInit } from '@angular/core';
import { Maniobra } from '../../models/maniobras.models';
import { ManiobraService } from '../../services/service.index';

@Component({
  selector: 'app-maniobras',
  templateUrl: './maniobras.component.html',
  styles: []
})
export class ManiobrasComponent implements OnInit {
   // tslint:disable-next-line:typedef-whitespace
   maniobras: Maniobra[] = [];
   // tslint:disable-next-line:no-inferrable-types
   cargando: boolean = true;
   // tslint:disable-next-line:no-inferrable-types
   totalRegistros: number = 0;
   // tslint:disable-next-line:no-inferrable-types
   desde: number = 0;
   constructor(public _maniobraService: ManiobraService) { }

  ngOnInit() {
    this.cargarManiobras();
  }

  cargarManiobras() {
    this.cargando = true;
    this._maniobraService.cargarManiobras(this.desde)
    .subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.maniobras = resp.maniobras;
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
    this.cargarManiobras();

  }

  buscarManiobra(termino: string) {
    if (termino.length <= 0) {
      this.cargarManiobras();
      return;
    }
    this.cargando = true;
    this._maniobraService.buscarManiobra(termino)
    .subscribe((maniobras: Maniobra[]) => {
      this.maniobras = maniobras;
      this.cargando = false;

    });
  }

  borrarManiobra( maniobras: Maniobra ) {

    this._maniobraService.borrarManiobra( maniobras._id )
            .subscribe( () =>  this.cargarManiobras() );

  }
}

