import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from './GLOBAL';
import {Observable} from 'rxjs';
import {Categoria} from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  public url;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  get_categorias(filtro): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'categorias/' + filtro, {headers: header});
  }

  update_cat(categoria, id: Categoria['_id']): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const json = JSON.stringify(categoria);
    return this.http.patch(this.url + 'categoria/editar/' + id, json, {headers: header});
  }

  get_cat(id: Categoria['_id']): Observable<any> {
    return this.http.get(this.url + 'categoria/' + id);
  }

  delete(id: Categoria['_id']): Observable<any> {
    return this.http.delete(this.url + 'categoria/eliminar/' + id);
  }

  create_cat(form) {
    const json = JSON.stringify(form);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // console.log(json);
    return this.http.post(this.url + 'categoria/registrar', json, {headers});
  }
}
