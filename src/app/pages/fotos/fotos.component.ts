import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item.models';
import { ManiobraService } from '../../services/maniobra/maniobra.service';
import { Maniobra } from '../../models/maniobras.models';
import { SubirArchivoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {
  maniobra: Maniobra;
  estaSobreElemento = false;
  archivos: FileItem[] = [];
  constructor(public _maniobraService: ManiobraService, public _subirArchivoService: SubirArchivoService) { }

  ngOnInit() {
  }
  cargarImagenes() {
    this._subirArchivoService.cargarImagenesMongo(this.archivos, 'maniobras', '5bce1b54e86b493cf07a0589');
  }

  limpiarArchivos() {
    this.archivos = [];
  }
}
