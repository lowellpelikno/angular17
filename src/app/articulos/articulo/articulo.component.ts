import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Articulo } from '../../interface/articulo';

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
  textoBotonSubmit = 'Crear Nuevo';
  articulos: Array<Articulo> = []
  mensaje: string = '';
  //localStorage: Storage;
  constructor(@Inject(DOCUMENT) private document: Document) { 
   const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      const articuloList = localStorage.getItem('articulos');
      if (articuloList) {
        this.articulos = JSON.parse(articuloList);
        return;
      }
      this.mensaje = "no se encontraron articulos";
      console.log(this.mensaje);
    }
  }
  
  agregar() {
    if (this.formularioArticulo.get('codigo')?.value == 0) {
      alert('Debe ingresar un código de articulo distinto a cero');
      return;
    }

    const findByDescripcion = this.articulos.find(v => v.descripcion == this.formularioArticulo.value.descripcion);
    let findByCodigo = this.articulos.find(v => v.codigo == this.formularioArticulo.get('codigo')?.value)!;
    if (findByDescripcion != undefined) {
      if (findByDescripcion?.codigo != findByCodigo?.codigo) {
        alert('ya existe un articulo con dicha descripcion');
        return;
      }
    }
    this.articulos.push({
      codigo: this.formularioArticulo.get('codigo')?.value ?? 0,
      descripcion: this.formularioArticulo.get('descripcion')?.value ?? '',
      precio: Number(this.formularioArticulo.get('precio')?.value )?? '',
    });
      
    localStorage.setItem('articulos',JSON.stringify(this.articulos));
    alert('articulo guardado');
    this.limpiar();
  }
  limpiar() {
    this.formularioArticulo.controls['codigo'].setValue(0);
    this.formularioArticulo.controls['descripcion'].setValue('');
    this.formularioArticulo.controls['precio'].setValue('0');
  }
  
}


