export class Viaje {

    constructor(
        public viaje?: string,
        public buque?: string,
        public fechaArrivo?: string,
        public fechaVigenciaTemporal?: string,
        public contenedores?: Array<any>,
        public pdfTemporal?: string,
        public usuario?: string,
        public _id?: string

    ) {}
}
