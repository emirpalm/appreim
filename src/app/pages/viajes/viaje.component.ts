import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Viaje } from '../../models/viajes.models';
import { ViajeService } from '../../services/service.index';
import { Buque } from '../../models/buques.models';
import { BuqueService } from '../../services/service.index';
import { Naviera } from '../../models/navieras.models';
import { NavieraService } from '../../services/service.index';
import { Contenedor } from '../../models/contenedores.models';
import { ContenedorService } from '../../services/service.index';
import {Observable} from 'rxjs';

export class MyItems {
  Value: string;
  constructor(Value: string) {
    this.Value = Value;
  }
}

export interface Vacioimport {
  value: string;
  viewValue: string;
}

export interface Tipo {
  value: string;
  viewValue: string;
}


@Component({
    selector: 'app-viaje',
    templateUrl: './viaje.component.html',
    styles: []
  })

  export class ViajeComponent implements OnInit {

  // title = 'Working With Array In Angular 5';
  // myItems: MyItems[] = new Array();
  // IsForUpdate: boolean = false;
  // newItem: any = {};
  // updatedItem;
  myControl = new FormControl();
  filteredOptions: Observable<Contenedor[]>;
  viajes: Viaje[] = [];
  viaje: Viaje = new Viaje('');
  buques: Buque[] = [];
  buque: Buque = new Buque('');
  navieras: Naviera[] = [];
  naviera: Naviera = new Naviera('');
  contenedores: Contenedor[] = [];
  contenedor: Contenedor = new Contenedor('', '', '');
  vacioimports: Vacioimport[] = [
    {value: 'Vacio-0', viewValue: 'Vacio'},
    {value: 'Importacion-1', viewValue: 'Importación'}
  ];
  tipos: Tipo[] = [
    // tslint:disable-next-line:quotemark
    {value: '20-0', viewValue: "20' H"},
    // tslint:disable-next-line:quotemark
    {value: '40-1', viewValue: "40' H"}
  ];

    constructor(public _viajeService: ViajeService,
      public _contenedorService: ContenedorService,
      public _buqueService: BuqueService,
      public _navieraService: NavieraService,
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
      this._buqueService.cargarBuques()
      .subscribe( buques => this.buques = buques );
      this._navieraService.cargarNavieras()
      .subscribe( navieras => this.navieras = navieras );

    }

    cargarViaje( id: string ) {
      this._viajeService.cargarViaje( id )
            .subscribe( viaje => {

              console.log( viaje );
              this.viaje = viaje;
              this.viaje.buque = viaje.buque._id;
              this.cambioBuque( this.viaje.buque );
              this.viaje.naviera = viaje.naviera._id;
              this.cambioNaviera( this.viaje.naviera );
              // this.viaje.contenedor = viaje.contenedor._id;
              // this.cambioContenedor( this.viaje.contenedor );
              // this.cambioFletera( this.camion.fletera );
              // this.camion.usuario = camion.usuario._id;
            });
    }

    cambioContenedor( id: string ) {

      this._contenedorService.cargarContenedor( id )
            .subscribe( contenedor => this.contenedor = contenedor );

    }

    cambioBuque( id: string ) {

      this._buqueService.cargarBuque( id )
            .subscribe( buque => this.buque = buque );

    }

    cambioNaviera( id: string ) {

      this._navieraService.cargarNaviera( id )
            .subscribe( naviera => this.naviera = naviera );

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

  }
