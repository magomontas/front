import {Component, OnInit} from '@angular/core';
import {Producto} from '../../../models/producto';
import {ProductoService} from '../../../services/producto.service';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Route, Router} from "@angular/router";

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {
  public producto;
  public file: File;
  public imgSelect: string | ArrayBuffer;
  public categorias;
  public success_message;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(private productoService: ProductoService, private storage: AngularFireStorage,
              private route: Router) {
    this.producto = new Producto('', '', '', '', 1, 1, 1, '', 1);
  }

  ngOnInit(): void {
    this.get_categorias();
  }

  onSubmit(productoForm) {
    if (productoForm.valid) {
      this.productoService.insert_producto(this.producto
        //   {
        //   titulo: productoForm.value.titulo,
        //   descripcion: productoForm.value.descripcion,
        //   imagen: this.urlImage,
        //   precio_compra: productoForm.value.precio_compra,
        //   precio_venta: productoForm.value.precio_venta,
        //   stock: productoForm.value.stock,
        //   id_categoria: productoForm.value.id_categoria,
        //   puntos: productoForm.value.puntos,
        // }
      ).subscribe(res => {
        this.success_message = 'El producto se ha almacenado correctamente';
        this.producto = new Producto('', '', '', '', 1, 1, 1, '', 1);
        this.route.navigate(['/productos']);
      }, error => {
        console.log('Error en el formulario');
      });
    }
  }

  imgSelected(event: HtmlInputEvent) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0] as File;
      const reader = new FileReader();
      reader.onload = e => this.imgSelect = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  get_categorias() {
    this.productoService.get_categorias().subscribe(
      res => {
        this.categorias = res.categorias;
        console.log(this.categorias);
      }, error => {
        console.log(error);
      }
    );
  }

  onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/product_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    // task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
    task.snapshotChanges().pipe(finalize(() => {
        this.urlImage = ref.getDownloadURL();
        const element = document.getElementById('url');
        const event = new Event('change');
        element.dispatchEvent(event);
      }
    )).subscribe();
  }
}
