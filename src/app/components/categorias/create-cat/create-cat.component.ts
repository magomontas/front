import { Component, OnInit } from '@angular/core';
import {CategoriaService} from '../../../services/categoria.service';
import {Categoria} from '../../../models/categoria';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-cat',
  templateUrl: './create-cat.component.html',
  styleUrls: ['./create-cat.component.css']
})
export class CreateCatComponent implements OnInit {
  public categoria;
  public success_message;

  constructor(private categoryService: CategoriaService, private router: Router) {
    this.categoria = new Categoria('', '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    console.log(form.value);
    this.categoryService.create_cat(this.categoria).subscribe(res => {
      if (res) {
        this.success_message = 'La categoria se ha registrado Correctamente';
        this.categoria = new Categoria('', '', '');
        this.router.navigate(['/categorias']);
      }
    }, error => {
      console.log(error);
    });
  }
}
