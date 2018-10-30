import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item.models';
import { ManiobraService } from '../../services/maniobra/maniobra.service';
import { Maniobra } from '../../models/maniobras.models';
import { SubirArchivoService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {
  // maniobra: Maniobra;
  estaSobreElemento = false;
  archivos: FileItem[] = [];
  maniobra: Maniobra = new Maniobra();
  selected = 'fotos_lavado';
  constructor(public _maniobraService: ManiobraService, public _subirArchivoService: SubirArchivoService, public router: Router,
    public activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe( params => {

        // tslint:disable-next-line:prefer-const
        let id = params['id'];

        if ( id !== 'nuevo' ) {
          this.cargarManiobra( id );
        }

      });
    }

  ngOnInit() {
  }

  cargarManiobra( id: string) {
    this._maniobraService.cargarManiobra( id )
          .subscribe( maniobra => {

            console.log( maniobra );
            this.maniobra = maniobra;
            // this.viaje.buque = viaje.buque._id;
            // this.cambioBuque( this.viaje.contenedor );
          });
  }

  cargarImagenes() {
    console.log(this.selected);
    this._subirArchivoService.cargarImagenesMongo(this.archivos, this.selected, this.maniobra._id);

  }

  limpiarArchivos() {
    this.archivos = [];
  }
}
