import { Contenedor } from './contenedores.models';

export class Viaje {

    constructor(
        public viaje?: string,
        public contenedor?: Contenedor[],
        public usuario?: string,
        public _id?: string

    ) {}
}
