import { Inject, Injectable } from '@angular/core';
import { Articulo } from '../interface/articulo';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

articulos: Array<Articulo> = [
    { codigo: 1, descripcion: 'papas', precio: 70.55 },
    { codigo: 2, descripcion: 'manzanas', precio: 12.1 },
    { codigo: 3, descripcion: 'melon', precio: 52.3 },
    { codigo: 4, descripcion: 'cebollas', precio: 8 },
    { codigo: 5, descripcion: 'calabaza', precio: 70.56 },
  ];
  constructor(@Inject(DOCUMENT) private document: Document) {}
  InitializeData():boolean {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      const counter = localStorage.getItem('articulos');
      if (counter==null) {
        localStorage.setItem('articulos',JSON.stringify(this.articulos) );
      } 
      return true;
    }
    return false;
  }
  Add(item: Articulo): string {
    const findByDescripcion = this.articulos.find(v => v.descripcion == item.descripcion);
    let findByCodigo = this.articulos.find(v => v.codigo == item.codigo)!;
    if (findByDescripcion != undefined) {
      if (findByDescripcion?.codigo != findByCodigo?.codigo) {       
        return 'Alerta: ya existe un articulo con dicha descripcion';
      }
    } 
    
    this.articulos.push({
      codigo: item.codigo ?? 0,
      descripcion: item.descripcion ?? '',
      precio: Number(item.precio )?? '',
    });      
    localStorage.setItem('articulos', JSON.stringify(this.articulos));
    return 'Exito: artículo agregado...';
  }
  Edit(item: Articulo): string {
    
    const findByDescripcion = this.articulos.find(v => v.descripcion == item.descripcion);
    let findByCodigo = this.articulos.find(v => v.codigo == item.codigo)!;
    if (findByDescripcion != undefined) {
      if (findByDescripcion?.codigo != findByCodigo?.codigo) {       
        return 'Alerta: ya existe un articulo con dicha descripcion';
      }
    } 
    findByCodigo.codigo = item.codigo ?? 0;
    findByCodigo.descripcion = item.descripcion ?? '';
    findByCodigo.precio = Number(item.precio) ?? '';
         
    localStorage.setItem('articulos', JSON.stringify(this.articulos));
    return 'Exito: artículo actualizado';
  }
  Exist(item: Articulo): boolean {
    this.FillData();
    const findByDescripcion = this.articulos.find(v => v.descripcion == item.descripcion);
    let findByCodigo = this.articulos.find(v => v.codigo == item.codigo)!;

    if (findByDescripcion != undefined) {
      if (findByDescripcion?.codigo != findByCodigo?.codigo) {        
        return true;
      }
    } 
    return false;
  }
  ExistByCode(id: number): Articulo|undefined {
    this.FillData();    
    return this.articulos.find(v => v.codigo === id);
  }
  FillData(): Array<Articulo> {
    const articuloList = localStorage.getItem('articulos');
      if (articuloList) {
        this.articulos = JSON.parse(articuloList);
    }
    return this.articulos;
  }
    
}
