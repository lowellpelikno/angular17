import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Articulo } from '../../interface/articulo';
import { ArticulosService } from '../../services/articulos.service';
import { retry } from 'rxjs';

@Component({
  selector: 'app-articulo-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule,RouterLink],
  templateUrl: './articuloList.component.html',
  styleUrl: './articuloList.component.css'
})
export class ArticuloListComponent implements OnInit{
  title = 'Formualrios.Reactivos';
  articulos: Array<Articulo> = [];
  mensaje: string = "";
  classBackgroundColor = "mensajeSuccess";
  constructor(private articulosServicio: ArticulosService) { }
  ngOnInit(): void {
    this.articulosServicio.Get().subscribe((result:any) => this.articulos = result.data);
  }
  hayRegistros() {
    
    return this.articulos.length > 0;
  }
  ordernarPorDescripcion() {
    this.articulos.sort((firstObject: Articulo, secondObject: Articulo) =>
      firstObject.descripcion > secondObject.descripcion ? 1 : -1
    );
  }
  ordernarPorCodigo() {
    this.articulos.sort((firstObject: Articulo, secondObject: Articulo) =>
      firstObject.id > secondObject.id ? 1 : -1
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
    this.articulosServicio.Delete(codigo).subscribe((result: any) => {
      this.mensaje = result.mensaje;
      if (!result.success) {
        this.classBackgroundColor = 'mensajeError';
        return;
      }
      this.articulosServicio.Get().subscribe((result:any) => this.articulos = result.data);
    });
  }
 
}
