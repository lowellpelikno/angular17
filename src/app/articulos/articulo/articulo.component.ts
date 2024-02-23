import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Articulo } from '../../interface/articulo';
import { ArticulosService } from '../../services/articulos.service';

@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule,RouterLink],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css'
})
export class ArticuloComponent {
title = 'Formualrios.Reactivos';
  formularioArticulo = new FormGroup({
    codigo: new FormControl(0, { validators: [Validators.required] }),
    descripcion: new FormControl(''),
    precio: new FormControl('', { validators:[Validators.pattern("/^(\d+)?([.]?\d{0,2})?$/g")]}),
  });

  //art: Articulo = { codigo: 0, descripcion: '', precio: 0 };Validators.pattern("^[0-9]*$")
  desableImputCodigo = false;
  nuevoArticulo = true;
  articulos: Array<Articulo> = [];
  articulo: Articulo = {codigo:0,descripcion:'',precio:0};
  mensaje: string = '';
  constructor(private articulosServicio: ArticulosService) { 
  
  }
  
  agregar() {
    if (this.formularioArticulo.get('codigo')?.value == 0) {
      alert('Debe ingresar un código de articulo distinto a cero');
      return;
    }
    this.articulo.codigo = this.formularioArticulo.get('codigo')?.value??0;
    this.articulo.descripcion = this.formularioArticulo.get('descripcion')?.value??'';
    this.articulo.precio = Number(this.formularioArticulo.get('precio')?.value) ?? 0;
    const result = this.articulosServicio.Add(this.articulo!);
    this.mensaje= result;
    this.limpiar();    
  }
  limpiar() {
    this.formularioArticulo.controls['codigo'].setValue(0);
    this.formularioArticulo.controls['descripcion'].setValue('');
    this.formularioArticulo.controls['precio'].setValue('0');
  }
  
}


