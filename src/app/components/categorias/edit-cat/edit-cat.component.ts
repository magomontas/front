import {Component, OnInit} from '@angular/core';
import {CategoriaService} from "../../../services/categoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Categoria} from "../../../models/categoria";
import {Producto} from "../../../models/producto";

@Component({
  selector: 'app-edit-cat',
  templateUrl: './edit-cat.component.html',
  styleUrls: ['./edit-cat.component.css']
})
export class EditCatComponent implements OnInit {
  public categoria;
  public id: Producto['_id'];
  public success_message;

  constructor(private categoryService: CategoriaService, private route: ActivatedRoute,
              private router: Router) {
    this.categoria = new Categoria('', '', '');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.categoryService.get_cat(this.id).subscribe(
        res => {
          this.categoria = res.categoria;
        }, error => {
          console.log(error);
        });
    });
  }

  onSubmit(categoriaForm) {
    // console.log(this.categoria, 'DATA A INSERTAR');
    if (categoriaForm.valid) {
      this.categoryService.update_cat(this.categoria, this.categoria._id).subscribe(
        res => {
          console.log(res);
          this.success_message = 'Categoria Editada correctamente';
          this.router.navigate(['/categorias']);
        }, error => {
          console.log(error);
        }
      );
    }
  }

}
