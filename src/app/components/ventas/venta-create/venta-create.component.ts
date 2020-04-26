import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ProductoService} from "../../../services/producto.service";
import {Venta} from "../../../models/venta";
import {DetalleVenta} from "../../../models/detalle-venta";

@Component({
  selector: 'app-venta-create',
  templateUrl: './venta-create.component.html',
  styleUrls: ['./venta-create.component.css']
})
export class VentaCreateComponent implements OnInit {
  public venta;
  public identity;
  public productos;
  public errorMensaje;
  public total = 0;
  public producto: any = {
    stock: '--|--',
  };
  public data_detalle: Array<any> = [];
  public detalle: any = {
    idproducto: ''
  };

  constructor(private userService: UserService, private productoService: ProductoService) {
    this.identity = this.userService.getIdentity();
    // this.venta = new Venta
  }

  ngOnInit(): void {
    // console.log(this.identity, 'identity');
    this.get_productos();
  }

  get_productos() {
    this.productoService.get_productos('').subscribe(res => {
      this.productos = res.producto;
      // console.log(this.productos, 'productos');
    }, error => {
      console.log(error);
    });

  }

  get_data_producto(id) {
    this.productoService.get_producto(id).subscribe(
      response => {
        this.producto = response.producto;
      }, error => {
        console.log(error);
      });
  }

  save_detalle(form) {
    if (form.valid) {
      if (form.value.cantidad <= this.producto.stock) {
        this.data_detalle.push({
          idproducto: form.value.idproducto,
          cantidad: form.value.cantidad,
          producto: this.producto.titulo,
          precio_venta: this.producto.precio_venta,
        });
        this.detalle = new DetalleVenta('', '', null, '');
        this.producto.stock = '--|--';
        this.total = this.total + (parseInt(this.producto.precio_venta) * parseInt(form.value.cantidad));
        // console.log(this.total);
      } else {
        this.errorMensaje = 'No existe la cantidad de productos que ha ingresado';
      }
    } else {
      console.log('Llene todos los campos');
    }
  }

  close_alert() {
    this.errorMensaje = '';
  }

  eliminar(idx, precio_venta, cantidad) {
    this.data_detalle.splice(idx, 1);
    this.total = this.total - (parseInt(precio_venta) * parseInt(cantidad));
  }

}
