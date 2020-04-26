import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from './GLOBAL';
import {Observable} from 'rxjs';
import {Producto} from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public url;
  public producto: Producto;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  get_productos(filtro): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'productos/' + filtro, {headers: header});
  }

  get_producto(id: Producto['_id']): Observable<any> {
    return this.http.get(this.url + 'producto/' + id);
  }

  get_categorias(): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'categorias/', {headers: header});
  }


  insert_producto(productoForm) {
    const json = JSON.stringify(productoForm);
    const header = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url + `producto/registrar`, json, {headers: header});
  }

  update_prod(form, id: Producto['_id']) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const json = JSON.stringify(form);

    console.log(form, 'data a insertar');
    return this.http.patch(this.url + `producto/editar/` + id, json, {headers});
  }

  delete(id: Producto['_id']): Observable<any> {
    return this.http.delete(this.url + 'producto/' + id);
  }

  stock(stockForm, id: Producto['_id']) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const json = JSON.stringify(stockForm);

    return this.http.patch(this.url + `producto/stock/` + id, json, {headers});
  }

}
