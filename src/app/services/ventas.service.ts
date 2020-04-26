import { Injectable } from '@angular/core';
import {GLOBAL} from './GLOBAL';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  public url;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  get_ventas(): Observable<any> {
    return this.http.get(this.url + `ventas`);
  }
}
