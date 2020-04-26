import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductoService} from '../../../services/producto.service';
import {Producto} from '../../../models/producto';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {
  public producto: Producto;
  public id: Producto['_id'];
  public categorias;
  public file: File;
  public imgSelect: string | ArrayBuffer;
  public success_message;
  public dataRead = {};

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(private route: ActivatedRoute, private productoService: ProductoService,
              private router: Router, private storage: AngularFireStorage) {
    this.producto = new Producto('', '', '', '', 1, 1, 1, '', 1);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.productoService.get_producto(this.id).subscribe(
        res => {
          this.producto = res.producto;
        }, error => {
          console.log(error);
        }
      );
    });
    this.get_categorias();
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

  onSubmit(productoForm) {
    if (productoForm.valid) {
      this.productoService.update_prod(this.producto, this.producto._id).subscribe(
        res => {
          console.log(res);
          this.success_message = 'El registro se actualizo corectamente';
          this.producto = new Producto('', '', '', '', 1, 1, 1, '', 1);
          this.router.navigate(['/productos']);
        }, error => {
          console.log(error);
        }
      );
    } else {
      console.log('Error de form');
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
