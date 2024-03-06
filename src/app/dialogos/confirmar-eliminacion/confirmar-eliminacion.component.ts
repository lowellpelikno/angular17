import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule } from '@angular/forms';
import {RouterLink, RouterOutlet } from '@angular/router';
import { Articulo } from '../../interface/articulo';
import {FormsModule} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-confirmar-eliminacion',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule,RouterLink,MatInputModule,MatButtonModule,FormsModule,MatDialogModule ],
  templateUrl: './confirmar-eliminacion.component.html',
  styleUrl: './confirmar-eliminacion.component.css'
})
export class ConfirmarEliminacionComponent {
  mensaje: string = "";
  classBackgroundColor = "mensajeSuccess";
  articulo!: Articulo;
  
  constructor(public dialogRef: MatDialogRef<ConfirmarEliminacionComponent>, @Inject(MAT_DIALOG_DATA) public data: Articulo) {
    
  }  
  ngOnInit() {
    this.mensaje = `¿Estás seguro de eliminar este artículo? \n código:${this.data.id} \n descripción:${this.data.descripcion} \n precio:${this.data.precio}`;
  }
  cancelar() {
    this.dialogRef.close(false);
  }
}


