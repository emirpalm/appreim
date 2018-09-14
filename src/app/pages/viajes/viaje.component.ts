import { Component, OnInit } from '@angular/core';
import { Camion } from '../../models/camiones.models';
import { CamionService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Viaje } from '../../models/viajes.models';
import { ViajeService } from '../../services/service.index';
import { Contenedor } from '../../models/contenedores.models';
import { ContenedorService } from '../../services/service.index';

export class MyItems {
  Value: string;
  constructor(Value: string) {
    this.Value = Value;
  }
}

@Component({
    selector: 'app-viaje',
    templateUrl: './viaje.component.html',
    styles: []
  })

  export class ViajeComponent implements OnInit {
      // Used To Specify Title using Interpolation
  // tslint:disable-next-line:member-ordering
  title = 'Working With Array In Angular 5';
  // Array where we are going to do CRUD operations
  // tslint:disable-next-line:member-ordering
  myItems: MyItems[] = new Array();

  // Other variables
  // tslint:disable-next-line:member-ordering
  // tslint:disable-next-line:no-inferrable-types
  // tslint:disable-next-line:member-ordering
  IsForUpdate: boolean = false;
  // tslint:disable-next-line:member-ordering
  newItem: any = {};
  // tslint:disable-next-line:member-ordering
  updatedItem;

    viajes: Viaje[] = [];
    viaje: Viaje = new Viaje('');
      // tslint:disable-next-line:typedef-whitespace
   contenedores: Contenedor[] = [];
   flagArray = [];
    constructor(public _viajeService: ViajeService,
        public _contenedorService: ContenedorService,
      public router: Router,
      public activatedRoute: ActivatedRoute,
      public _modalUploadService: ModalUploadService) {

        activatedRoute.params.subscribe( params => {

          // tslint:disable-next-line:prefer-const
          let id = params['id'];

          if ( id !== 'nuevo' ) {
            this.cargarViaje( id );
          }

        });
      }

    ngOnInit() {
      this._viajeService.cargarViajes()
      .subscribe( viajes => this.viajes = viajes );
      this._contenedorService.cargarContenedores()
      .subscribe( contenedores => this.contenedores = contenedores );

    }

    cargarViaje( id: string ) {
      this._viajeService.cargarViaje( id )
            .subscribe( viaje => {

              console.log( viaje );
              this.viaje = viaje;
              this.viaje.contenedor = viaje.contenedor._id;
              // this.cambioFletera( this.camion.fletera );
              // this.camion.usuario = camion.usuario._id;
            });
    }

    guardarViaje( f: NgForm ) {

      console.log( f.valid );
      console.log( f.value );

      if ( f.invalid ) {
        return;
      }

      this._viajeService.guardarViaje( this.viaje )
              .subscribe( viaje => {

                this.viaje._id = viaje._id;

                this.router.navigate(['/viaje', viaje._id ]);

              });

    }
   // cambioContenedor( id: string ) {

     // this._fleteraService.cargarFletera( id )
       //     .subscribe( fletera => this.fletera = fletera );

    // }

  AddItem() {
    this.myItems.push(
      this.newItem
    );
    this.newItem = {};
  }
// When user selects edit option
EditItem(i) {
  this.newItem.Value = this.myItems[i].Value;
  this.updatedItem = i;
  this.IsForUpdate = true;
}

// When user clicks on update button to submit updated value
UpdateItem() {
  // tslint:disable-next-line:prefer-const
  let data = this.updatedItem;
  for (let i = 0; i < this.myItems.length; i++) {
    if (i === data) {
      this.myItems[i].Value = this.newItem.Value;
    }
  }
  this.IsForUpdate = false;
  this.newItem = {};
}

// To delete specific item
DeleteItem(i) {
  this.myItems.splice(i, 1);
}

  }
