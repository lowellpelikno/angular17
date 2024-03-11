import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { Articulo } from '../../interface/articulo';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-confirmar-activarDesactivar',
  standalone: true,
  imports: [CommonModule,MatInputModule,MatButtonModule,MatDialogModule ],
  templateUrl: './confirmar-activarDesactivar.component.html',
  styleUrl: './confirmar-activarDesactivar.component.css'
})
export class ConfirmarActivarDesactivarComponent {
  mensaje: string = "";
  classBackgroundColor = "mensajeSuccess";
  articulo!: Articulo;
  
  constructor(public dialogRef: MatDialogRef<ConfirmarActivarDesactivarComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
    
  }  
  ngOnInit() {
    this.mensaje = this.data;
  }
  cancelar() {
    this.dialogRef.close(false);
  }
}


