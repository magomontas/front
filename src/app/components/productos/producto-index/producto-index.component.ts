import {Component, OnInit} from '@angular/core';
import {ProductoService} from '../../../services/producto.service';
import {GLOBAL} from '../../../services/GLOBAL';
import Swal from 'sweetalert2';
import {Producto} from '../../../models/producto';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {

  public productos;
  public producto_stock;
  public producto_id;
  public url;
  public filtro;
  public mensaje;
  public p;

  constructor(
    private productoService: ProductoService
  ) {
    this.producto_stock = new Producto('', '', '', '', 1, 1, 1, '', 1);
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.getProds();
  }

  search(searchForm) {
    // console.log(searchForm.value.filtroText);
    this.productoService.get_productos(searchForm.value.filtro).subscribe(
      res => {
        this.productos = res.producto;
      }, error => {
        console.log(error);
      }
    );
  }

  delete(id) {
    Swal.fire({
      title: '¿Está Seguro?',
      text: '¡Al presionar el botón de Eliminar, no hay forma de retroceder!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, quiero eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
      confirmButtonColor: '#01BF39',
      cancelButtonColor: 'red'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          '¡Registro Eliminado!',
          'El registro se eliminó con éxito.',
          'success'
        );
        this.productoService.delete(id).subscribe(res => {
          if (res) {
            Swal.fire('Eliminado!', 'El registro ha sido elimando!');
            this.getProds();
          }
        }, error => {
          console.log(error);
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Se ha cancelado la eliminación :)',
          'error'
        );
      }
    });
  }

  getProds() {
    this.productoService.get_productos('').subscribe(
      response => {
        this.productos = response.producto;
      }, error => {
        console.log(error);
      });
  }

  getid(id) {
    this.producto_id = id;
    console.log(this.producto_id, 'Id del producto al dar click');
  }

  close_alert() {
    this.mensaje = '';
  }

  aumentar_stock(stockForm) {
    if (stockForm.valid) {
      if (this.producto_id) {
        this.productoService.stock(this.producto_stock, this.producto_id).subscribe(res => {
          this.getProds();
          // @ts-ignore
          $('.modal').modal('hide');
        }, error => {
          console.log(error);
        });
      }
    }
  }
}
