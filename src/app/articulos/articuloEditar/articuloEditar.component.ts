import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { Articulo } from '../../interface/articulo';

@Component({
  selector: 'app-articulo-edit',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './articuloEditar.component.html',
  styleUrl: './articuloEditar.component.css'
})
export class ArticuloEditarComponent {
  title = 'Formualrios.Reactivos';
  cod: number=0; 
//art: Articulo = { codigo: 0, descripcion: '', precio: 0 };Validators.pattern("^[0-9]*$")
  desableImputCodigo = false;
  nuevoArticulo = true;
  textoBotonSubmit = 'Crear Nuevo';
  articulos: Array<Articulo> = [];
  articulo: Articulo | undefined;
   formularioArticulo = new FormGroup({
    codigo: new FormControl({ value: 0, disabled:true }, { validators: [Validators.required] }),
    descripcion: new FormControl(''),
    precio: new FormControl('', { validators:[Validators.pattern("/^(\d+)?([.]?\d{0,2})?$/g")]}),
  });
  constructor(private activatedRoute: ActivatedRoute,@Inject(DOCUMENT) private document: Document) {
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.cod = parseInt(parametros.get("cod")!);
    })
    if (localStorage) {
      const articulosLocal = localStorage.getItem('articulos');

      if (articulosLocal) {
        this.articulos = JSON.parse(articulosLocal);
      } 
    }
    this.hayRegistros();
  }  
  hayRegistros() {
   this.articulo = this.articulos.find((firstObject: Articulo) =>
      firstObject.codigo == this.cod
    );
    this.formularioArticulo.controls['codigo'].setValue(this.articulo?.codigo??0);
    this.formularioArticulo.controls['descripcion'].setValue(this.articulo?.descripcion??'');
    this.formularioArticulo.controls['precio'].setValue(this.articulo?.precio.toString()??'');
    return this.articulos.length > 0;
  }  
  editar() {
    if (this.formularioArticulo.value.codigo == 0) {
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
    
    findByCodigo.codigo = this.formularioArticulo.get('codigo')?.value??0;
    findByCodigo.descripcion = this.formularioArticulo.get('descripcion')?.value??'';
    findByCodigo.precio = Number(this.formularioArticulo.get('precio')?.value) ?? 0;
    localStorage.setItem('articulos',JSON.stringify(this.articulos) );
    alert('Articulo actualizado');
  }
  
  limpiar() {
    this.formularioArticulo.controls['codigo'].enable();
    this.formularioArticulo.controls['codigo'].setValue(0);
    this.formularioArticulo.controls['descripcion'].setValue('');
    this.formularioArticulo.controls['precio'].setValue('0');
  }  
}
