import { Inject, Injectable } from '@angular/core';
import { Articulo } from '../interface/articulo';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  _SERVER_ = 'http://PortaFolioJesusIvan.somee.com/api/';
  _HTTPOPTIONS_ = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    } 
  
  articulos: Array<Articulo> =[];
  constructor(private http: HttpClient) {
  }
  
  Get() {    
    return this.http.get(`${this._SERVER_}articulos`);
  }
  ExistByCode(id: number) {
    return this.http.get(`${this._SERVER_}articulos/${id}`);
  }
  Add(item: Articulo) {    
    return this.http.post(`${this._SERVER_}articulos`, JSON.stringify(item),this._HTTPOPTIONS_);    
  }
  Edit(item: Articulo) {
    return this.http.put(`${this._SERVER_}articulos`, JSON.stringify(item),this._HTTPOPTIONS_);
  }
  ActivarDesactivar(item: Articulo) {
    return this.http.put(`${this._SERVER_}articulos/ActivarDesactivar`, JSON.stringify(item),this._HTTPOPTIONS_);
  }
  Delete(id: number) {
    return this.http.delete(`${this._SERVER_}articulos/${id}`);
  }
}
