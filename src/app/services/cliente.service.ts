import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from './GLOBAL';
import {Observable} from 'rxjs';
import {Cliente} from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  get_clientes(): Observable<any> {
    return this.http.get(this.url + `clientes`);
  }

  get_cliente(id: Cliente['_id']): Observable<any> {
    return this.http.get(this.url + `cliente/` + id);
  }

  delete(id: Cliente['_id']): Observable<any> {
    return this.http.delete(this.url + `cliente/eliminar/` + id);
  }

  new_cliente(form) {
    const json = JSON.stringify(form);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url + `cliente/registrar`, json, {headers});
  }

  edit_cliente(form) {
    const json = JSON.stringify(form);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.patch(this.url + `cliente/editar/` + form._id, json, {headers});
  }
}
