import { Component, OnInit } from '@angular/core';
import { Maniobra } from '../../models/maniobras.models';
import { ManiobraService } from '../../services/service.index';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

declare var jQuery: any;
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
  public exportpdf() {
    // tslint:disable-next-line:no-var-keyword
    // tslint:disable-next-line:prefer-const
    let data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      // tslint:disable-next-line:prefer-const
      let imgWidth = 208;
        // tslint:disable-next-line:prefer-const
      let pageHeight = 295;
        // tslint:disable-next-line:prefer-const
      let imgHeight = canvas.height * imgWidth / canvas.width;
        // tslint:disable-next-line:prefer-const
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
        // tslint:disable-next-line:prefer-const
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        // tslint:disable-next-line:prefer-const
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

  cargarManiobras() {
    this.cargando = true;
    this._maniobraService.cargarManiobras(this.desde)
    .subscribe(maniobras =>
      // this.totalRegistros = resp.total;
      this.maniobras = maniobras
    );
}

  cambiarDesde(valor: number) {
    // tslint:disable-next-line:prefer-const
    let desde = this.desde + valor;
    console.log(desde);
    if (desde >= this._maniobraService.totalManiobras) {
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
    .subscribe( maniobras =>  this.maniobras = maniobras );
  }

  borrarManiobra( maniobras: Maniobra ) {

    this._maniobraService.borrarManiobra( maniobras._id )
            .subscribe( () =>  this.cargarManiobras() );

  }

  buscarManiobraFecha(fechaIncio: string, fechaFin: string) {
    console.log(fechaIncio);
    console.log(fechaFin);
    if (fechaIncio.length <= 0 || fechaFin.length <= 0) {
      this.cargarManiobras();
      return;
    }
    this.cargando = true;
    this._maniobraService.buscarManiobraFecha(fechaIncio, fechaFin)
    .subscribe( maniobras =>  this.maniobras = maniobras );
  }
  }
}

