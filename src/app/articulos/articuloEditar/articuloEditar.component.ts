import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, RouterLink, RouterOutlet } from '@angular/router';
import { Articulo } from '../../interface/articulo';
import { ArticulosService } from '../../services/articulos.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-articulo-edit',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule,RouterLink,MatInputModule,MatButtonModule,FormsModule],
  templateUrl: './articuloEditar.component.html',
  styleUrl: './articuloEditar.component.css'
})
export class ArticuloEditarComponent implements OnInit{
  title = 'Formualrios.Reactivos';
  cod: number=0; 
//art: Articulo = { codigo: 0, descripcion: '', precio: 0 };Validators.pattern("^[0-9]*$")
  desableImputCodigo = false;
  mensaje: string = "";
  classBackgroundColor = "mensajeSuccess";
  articulo!: Articulo;
  monto = 0;
  formularioArticulo = new FormGroup({
    codigo: new FormControl({ value: 0, disabled:true }, { validators: [Validators.required] }),
    descripcion: new FormControl(''),
    precio: new FormControl(''),
  });
  constructor(private activatedRoute: ActivatedRoute, private articulosServicio: ArticulosService) {
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.cod = parseInt(parametros.get("cod")!);
    });
    this.articulo = { id: 0, descripcion: '', precio: 0 };
  }  
  ngOnInit() {
    this.hayRegistros();
  }
  hayRegistros() {
    this.articulosServicio.ExistByCode(this.cod).subscribe((result: any) => {
      this.mensaje = result.mensaje;
      if (!result.success) {
        this.classBackgroundColor = "mensajeError";
        return;
      }
      this.formularioArticulo.controls['codigo'].setValue(result?.data?.id??0);
      this.formularioArticulo.controls['descripcion'].setValue(result?.data?.descripcion??'');
      this.formularioArticulo.controls['precio'].setValue(result?.data?.precio??'');
    });
  }  
  editar() {
    if (this.formularioArticulo.get('codigo')?.value == 0) {
      this.mensaje = 'Debe ingresar un código de articulo distinto a cero';
    }
    const prec = this.formularioArticulo.get('precio')?.value ?? '0';
    this.articulo.id = this.formularioArticulo.get('codigo')?.value??0;
    this.articulo.descripcion = this.formularioArticulo.get('descripcion')?.value??'';
    this.articulo.precio = Number(prec.replace('$',''));
    this.articulosServicio.Edit(this.articulo!).subscribe((result:any) => {
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
