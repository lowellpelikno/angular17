import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Articulo } from '../../interface/articulo';
import { ArticulosService } from '../../services/articulos.service';
import {FormsModule} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-articulo-dialogo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatInputModule,MatButtonModule,FormsModule,MatDialogModule,MatSlideToggleModule ],
  templateUrl: './articulo-dialogo.component.html',
  styleUrl: './articulo-dialogo.component.css'
})
export class ArticuloDialogoComponent {
  mensaje: string = "";
  classBackgroundColor = "mensajeSuccess";
  articulo: Articulo = { id: 0, descripcion: '', precio: 0, activo:false, imagen:'',fechaAlta: new Date,fechaEdicion : new Date  };
  isEdit = false;
  activo = false;
  image = '';
  MAXIMO_TAMANIO_BYTES = 2000000; // 1MB = 1 millón de bytes
  //MAXIMO_TAMANIO_BYTES = 1000000; // 1MB = 1 millón de bytes
  formularioArticulo = new FormGroup({
    codigo: new FormControl({ value: 0,disabled:true }, { validators: [Validators.required] }),
    descripcion: new FormControl('',{ validators: [Validators.required] }),
    precio: new FormControl(''),
    imagen:new FormControl(''),
    activo: new FormControl(false),
  });
  //
  constructor( private articulosServicio: ArticulosService,public dialogRef: MatDialogRef<ArticuloDialogoComponent>,@Inject(MAT_DIALOG_DATA) public data: Articulo|undefined
  ) {
    
  }  
  ngOnInit() {
    if (this.data != undefined || this.data != null) {
      this.isEdit = true;
      this.formularioArticulo.controls['codigo'].setValue(this.data.id);
      this.formularioArticulo.controls['descripcion'].setValue(this.data.descripcion);
      this.formularioArticulo.controls['precio'].setValue(this.data.precio.toString());
      this.activo = this.data.activo;
      this.image = this.data.imagen;
    }
  }
  cancelar() {
    this.limpiar();
    this.dialogRef.close(false);
  }
  agregar() {
    
    this.articulo.id = 0;
    this.articulo.descripcion = this.formularioArticulo.get('descripcion')?.value??'';
    this.articulo.precio = Number(this.formularioArticulo.get('precio')?.value) ?? 0;
    this.articulo.imagen = this.image ?? 0;
    this.articulo.activo = this.activo;
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
    this.articulo.imagen = this.image ?? 0;
    this.articulo.activo = this.activo;
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
  change(e: any) {
    this.activo = e.checked;
  }
  convertImageToBase64(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file.size > this.MAXIMO_TAMANIO_BYTES) {
      const tamanioEnMb = this.MAXIMO_TAMANIO_BYTES / 1000000;
      this.mensaje = `El tamaño máximo es ${tamanioEnMb} MB`;
      // Limpiar
      event.target.files[0] = "";
      return;
    }
    
    reader.onload = (event: any) => {
      const base64String = event.target.result;
      this.image = base64String;
        // Now you can use the base64String as needed (e.g., store it in your model property).
        console.log(base64String);
    };

    reader.readAsDataURL(file);
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


