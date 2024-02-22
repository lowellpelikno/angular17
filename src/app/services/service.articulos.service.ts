import { Inject, Injectable } from '@angular/core';
import { Articulo } from '../interface/articulo';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ServiceArticulosService {

articulos: Array<Articulo> = [
    { codigo: 1, descripcion: 'papas', precio: 70.55 },
    { codigo: 2, descripcion: 'manzanas', precio: 12.1 },
    { codigo: 3, descripcion: 'melon', precio: 52.3 },
    { codigo: 4, descripcion: 'cebollas', precio: 8 },
    { codigo: 5, descripcion: 'calabaza', precio: 70.56 },
  ];
  constructor(@Inject(DOCUMENT) private document: Document) { 
    const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      const counter = localStorage.getItem('articulos');

      if (counter==null) {
        localStorage.setItem('articulos',JSON.stringify(this.articulos) );
      } 
    }
  }

}
