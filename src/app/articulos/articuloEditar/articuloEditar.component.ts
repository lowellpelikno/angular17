import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { Articulo } from '../../interface/articulo';
import { ArticulosService } from '../../services/articulos.service';

@Component({
  selector: 'app-articulo-edit',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './articuloEditar.component.html',
  styleUrl: './articuloEditar.component.css'
})
export class ArticuloEditarComponent implements OnInit{
  title = 'Formualrios.Reactivos';
  cod: number=0; 
//art: Articulo = { codigo: 0, descripcion: '', precio: 0 };Validators.pattern("^[0-9]*$")
  desableImputCodigo = false;
  nuevoArticulo = true;
  textoBotonSubmit = 'Crear Nuevo';
  mensaje: string = "";
  articulos: Array<Articulo> = [];
  articulo: Articulo | undefined;

  formularioArticulo = new FormGroup({
    codigo: new FormControl({ value: 0, disabled:true }, { validators: [Validators.required] }),
    descripcion: new FormControl(''),
    precio: new FormControl('', { validators:[Validators.pattern("/^(\d+)?([.]?\d{0,2})?$/g")]}),
  });
  constructor(private activatedRoute: ActivatedRoute, private articulosServicio: ArticulosService) {
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.cod = parseInt(parametros.get("cod")!);
    });
  }  
  ngOnInit() {
    this.hayRegistros();
  }
  hayRegistros() {
    this.articulo = this.articulosServicio.ExistByCode(this.cod);
    if (this.articulo === undefined){
      this.mensaje = 'no se encontro el artículo...';
      return false;
    }
    this.formularioArticulo.controls['codigo'].setValue(this.articulo?.codigo??0);
    this.formularioArticulo.controls['descripcion'].setValue(this.articulo?.descripcion??'');
    this.formularioArticulo.controls['precio'].setValue(this.articulo?.precio.toString()??'');
    return true;

  //   this.articulos = this.articulosServicio.FillData();
  //  this.articulo = this.articulos.find((firstObject: Articulo) =>
  //     firstObject.codigo == this.cod
  //   );
  //   if (this.articulo === undefined) {
  //     this.mensaje = 'no se encontro el artículo...';
  //     return false;
  //   }
  //   this.formularioArticulo.controls['codigo'].setValue(this.articulo?.codigo??0);
  //   this.formularioArticulo.controls['descripcion'].setValue(this.articulo?.descripcion??'');
  //   this.formularioArticulo.controls['precio'].setValue(this.articulo?.precio.toString()??'');
  //   return true;
  }  
  editar() {
    if (this.formularioArticulo.value.codigo == 0) {
      this.mensaje = 'Debe ingresar un código de articulo distinto a cero';
    }
    this.articulo!.codigo = this.formularioArticulo.get('codigo')?.value??0;
    this.articulo!.descripcion = this.formularioArticulo.get('descripcion')?.value??'';
    this.articulo!.precio = Number(this.formularioArticulo.get('precio')?.value) ?? 0;
    const result = this.articulosServicio.Edit(this.articulo!);
    this.mensaje= result;
  }
  
  limpiar() {
    this.formularioArticulo.controls['codigo'].enable();
    this.formularioArticulo.controls['codigo'].setValue(0);
    this.formularioArticulo.controls['descripcion'].setValue('');
    this.formularioArticulo.controls['precio'].setValue('0');
  }  
}
