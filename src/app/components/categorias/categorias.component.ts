import {Component, OnInit} from '@angular/core';
import {CategoriaService} from '../../services/categoria.service';
import {Categoria} from '../../models/categoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  public categoria = [];
  public filtro;
  public mensaje;
  public p;
  public id: Categoria['_id'];

  constructor(private categoryService: CategoriaService) {}

  ngOnInit(): void {
    this.get_categorias();
  }

  search(searchForm) {
    // console.log(searchForm.value.filtroText);
    this.categoryService.get_categorias(searchForm.value.filtro).subscribe(
      res => {
        this.categoria = res.categorias;
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
      confirmButtonText: 'Si, quiero Eliminar!',
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
        this.categoryService.delete(id).subscribe(res => {
          if (res) {
            this.mensaje = 'La categoria se ha eliminado con éxito!';
            this.get_categorias();
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

  get_categorias() {
    this.categoryService.get_categorias('').subscribe(
      res => {
        console.log(res);
        this.categoria = res.categorias;
      }, error => {
        console.log(error);
      }
    );
  }
}
