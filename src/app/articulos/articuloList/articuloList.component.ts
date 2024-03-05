import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { ArticulosService } from '../../services/articulos.service';
import { MatPaginator } from '@angular/material/paginator';
import { Articulo } from '../../interface/articulo';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articulo-list',
  standalone: true,
  templateUrl: './articuloList.component.html',
  styleUrls: ['./articuloList.component.css'],
  imports: [    
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatTableModule,  
    MatSortModule],
})
export class ArticuloListComponent implements OnInit {
  columnas: string[] = ['id', 'descripcion', 'precio','editar','eliminar'];
  datos: Array<Articulo> = [];
  //datos: Articulo[] = [];
  //dataSource:any;
  dataSource!: MatTableDataSource<Articulo, MatPaginator>;
constructor (private articulosServicio: ArticulosService){}
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  ngOnInit() {
    this.articulosServicio.Get().subscribe((result: any) => {
      this.datos = result.data;
      this.dataSource = new MatTableDataSource<Articulo>(this.datos);
      this.dataSource.sort = this.sort;
    });
    // for (let x = 1; x <= 10; x++)
    //   this.datos.push(new Articulo(x, `artículo ${x}`, Math.trunc(Math.random() * 1000)));
    // this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    // this.dataSource.sort = this.sort;
  }
  borrar(codigo: number) {
    this.articulosServicio.Delete(codigo).subscribe((result: any) => {
      //this.mensaje = result.mensaje;
      if (!result.success) {
        //this.classBackgroundColor = 'mensajeError';
        return;
      }
      this.articulosServicio.Get().subscribe((result: any) => {
      this.datos = result.data;
      this.dataSource = new MatTableDataSource<Articulo>(this.datos);
      this.dataSource.sort = this.sort;
    });
    });
  }
 
}

// export class Articulo {
//   constructor(public codigo: number, public descripcion: string, public precio: number) {
//   }
// }