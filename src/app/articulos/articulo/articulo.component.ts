import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Articulo } from '../../interface/articulo';
import { ArticulosService } from '../../services/articulos.service';
import {FormsModule} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule,RouterLink,MatInputModule,MatButtonModule,FormsModule],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css'
})
export class ArticuloComponent {
title = 'Formualrios.Reactivos';
  mensaje: string = "";
  classBackgroundColor = "mensajeSuccess";
  articulo!: Articulo;

  formularioArticulo = new FormGroup({
    codigo: new FormControl(0, { validators: [Validators.required] }),
    descripcion: new FormControl(''),
    precio: new FormControl(''),
  });
  constructor( private articulosServicio: ArticulosService) {
    this.articulo = { id: 0, descripcion: '', precio: 0 };
  }  
  ngOnInit() {
  }
  
  agregar() {
    // if (this.formularioArticulo.get('codigo')?.value == 0) {
    //   this.classBackgroundColor = "mensajeError";
    //   this.mensaje = 'Debe ingresar un código de articulo distinto a cero';
    //   return;
    // }
    this.articulo.id = 0;
    this.articulo.descripcion = this.formularioArticulo.get('descripcion')?.value??'';
    this.articulo.precio = Number(this.formularioArticulo.get('precio')?.value) ?? 0;
    this.articulosServicio.Add(this.articulo!).subscribe((result:any) => {
      this.mensaje = result.mensaje;
      if (!result.success) this.classBackgroundColor = "mensajeError";
      else this.limpiar();
    });
  }
  limpiar() {
    this.formularioArticulo.controls['codigo'].setValue(0);
    this.formularioArticulo.controls['descripcion'].setValue('');
    this.formularioArticulo.controls['precio'].setValue('0');
  }
  
}


