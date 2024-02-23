import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Articulo } from '../../interface/articulo';
import { ArticulosService } from '../../services/articulos.service';

@Component({
  selector: 'app-articulo-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule,RouterLink],
  templateUrl: './articuloList.component.html',
  styleUrl: './articuloList.component.css'
})
export class ArticuloListComponent {
title = 'Formualrios.Reactivos';
  formularioArticulo = new FormGroup({
    codigo: new FormControl(0, { validators: [Validators.required] }),
    descripcion: new FormControl(''),
    precio: new FormControl('', { validators:[Validators.pattern("/^(\d+)?([.]?\d{0,2})?$/g")]}),
  });
  desableImputCodigo = false;
  nuevoArticulo = true;
  textoBotonSubmit = 'Crear Nuevo';
  articulos: Array<Articulo> = [];
  
  constructor(private articulosServicio: ArticulosService) { 
    
    this.hayRegistros()
  }
  hayRegistros() {
    this.articulos = this.articulosServicio.FillData();
    return this.articulos.length > 0;
  }
  ordernarPorDescripcion() {
    this.articulos.sort((firstObject: Articulo, secondObject: Articulo) =>
      firstObject.descripcion > secondObject.descripcion ? 1 : -1
    );
  }
  ordernarPorCodigo() {
    this.articulos.sort((firstObject: Articulo, secondObject: Articulo) =>
      firstObject.codigo > secondObject.codigo ? 1 : -1
    );
  }
  ordernarPorMenorPrecio() {
    this.articulos.sort((firstObject: Articulo, secondObject: Articulo) =>
      firstObject.precio > secondObject.precio ? 1 : -1
    );
  }
  ordernarPorMayorPrecio() {
    this.articulos.sort((firstObject: Articulo, secondObject: Articulo) =>
      firstObject.precio > secondObject.precio ? -1 : 1
    );
  }
  borrar(codigo: number) {

    let findByCodigo = this.articulos.findIndex(v => v.codigo == codigo);
    
    if (findByCodigo) {
      this.articulos.splice(findByCodigo, 1);
      localStorage.setItem('articulos',JSON.stringify(this.articulos));
      return;
      }
    for (let x = 0; x < this.articulos.length; x++)
      if (this.articulos[x].codigo == codigo) {
        this.articulos.splice(x, 1);
        return;
      }
  }
 
}
