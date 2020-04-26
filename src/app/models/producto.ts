import {Observable} from "rxjs";

export class Producto {
    constructor(
        public _id: string,
        public titulo: string,
        public descripcion: string,
        public imagen: string,
        public precio_compra: number,
        public precio_venta: number,
        public stock: number,
        public id_categoria: string,
        public puntos: number,
    ) {
  }
}
