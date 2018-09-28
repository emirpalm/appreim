import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item.models';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {

  estaSobreElemento = false;
  archivos: FileItem[] = [];
  constructor() { }

  ngOnInit() {
  }
  cargarImagenes() {
  }

  limpiarArchivos() {
    this.archivos = [];
  }
}
