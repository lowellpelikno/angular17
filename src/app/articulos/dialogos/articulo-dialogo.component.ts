import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {RouterLink, RouterOutlet } from '@angular/router';
import { Articulo } from '../../interface/articulo';
import { ArticulosService } from '../../services/articulos.service';
import {FormsModule} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-articulo-dialogo',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule,RouterLink,MatInputModule,MatButtonModule,FormsModule,MatDialogModule ],
  templateUrl: './articulo-dialogo.component.html',
  styleUrl: './articulo-dialogo.component.css'
})
export class ArticuloDialogoComponent {
  mensaje: string = "";
  classBackgroundColor = "mensajeSuccess";
  articulo: Articulo = { id: 0, descripcion: '', precio: 0 };
  isEdit = false;
  formularioArticulo = new FormGroup({
    codigo: new FormControl({ value: 0,disabled:true }, { validators: [Validators.required] }),
    descripcion: new FormControl('',{ validators: [Validators.required] }),
    precio: new FormControl(''),
  });
  //
  constructor( private articulosServicio: ArticulosService,public dialogRef: MatDialogRef<ArticuloDialogoComponent>,@Inject(MAT_DIALOG_DATA) public data: Articulo|undefined
  ) {
    if (data != undefined || data != null) {
      this.isEdit = true;
      this.formularioArticulo.controls['codigo'].setValue(data.id);
      this.formularioArticulo.controls['descripcion'].setValue(data.descripcion);
      this.formularioArticulo.controls['precio'].setValue(data.precio.toString());
    }
  }  
  ngOnInit() {
  }
  cancelar() {
    this.limpiar();
    this.dialogRef.close(false);
  }
  agregar() {
    
    this.articulo.id = 0;
    this.articulo.descripcion = this.formularioArticulo.get('descripcion')?.value??'';
    this.articulo.precio = Number(this.formularioArticulo.get('precio')?.value) ?? 0;
    this.articulosServicio.Add(this.articulo!).subscribe((result:any) => {
      this.mensaje = result.mensaje;
      if (!result.success) {
        this.classBackgroundColor = "mensajeError";
        //this.dialogRef.close(false);
      }
      else {
        this.limpiar();
        this.dialogRef.close(true);
      }
    });
  }
  editar() {    
    this.articulo.id = this.formularioArticulo.get('codigo')?.value??0;
    this.articulo.descripcion = this.formularioArticulo.get('descripcion')?.value??'';
    this.articulo.precio = Number(this.formularioArticulo.get('precio')?.value) ?? 0;
    this.articulosServicio.Edit(this.articulo!).subscribe((result:any) => {
      this.mensaje = result.mensaje;
      if (!result.success) {
        this.classBackgroundColor = "mensajeError";
        //this.dialogRef.close(false);
      }
      else {
        this.limpiar();
        this.dialogRef.close(true);
      }
    });
  }
  limpiar() {
    this.formularioArticulo.controls['codigo'].setValue(0);
    this.formularioArticulo.controls['descripcion'].setValue('');
    this.formularioArticulo.controls['precio'].setValue('0');
  }
  submit() {
    this.isEdit ? this.editar(): this.agregar();
  }
  
}


