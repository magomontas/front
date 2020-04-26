import {Injectable} from '@angular/core';
import {GLOBAL} from './GLOBAL';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {Producto} from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url;
  public user;
  public token;
  public identity;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
    this.user = new User('', '', '', '', '', '');
  }

  login(user, getToken = null): Observable<any> {
    const json = user;
    if (getToken != null) {
      user.getToken = true;
    }
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'login', json, {headers: header});
  }

  getToken(): Observable<any> {
    const token = JSON.stringify(localStorage.getItem('token'));
    if (token) {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  getIdentity(): Observable<any> {
    const identity = JSON.parse(localStorage.getItem('identity'));
    if (identity !== undefined) {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getUsers(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(this.url + 'usuarios', {headers});
  }

  delete(id: User['_id']): Observable<any> {

    return this.http.delete(this.url + 'usuario/eliminar/' + id);
  }

  getUsuario(id: User['_id']): Observable<any> {
    return this.http.get(this.url + 'usuario/' + id);
  }

  editar(form): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.patch(this.url + 'usuario/editar/' + form._id, form, {headers});
  }

  registrar(form): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const json = JSON.stringify(form);

    return this.http.post(this.url + 'registrar', json, {headers});
  }
}
