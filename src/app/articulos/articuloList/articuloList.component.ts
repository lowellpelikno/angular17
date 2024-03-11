import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { ArticulosService } from '../../services/articulos.service';
import { MatPaginator } from '@angular/material/paginator';
import { Articulo } from '../../interface/articulo';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ArticuloDialogoComponent } from '../dialogos/articulo-dialogo.component';
import { ConfirmarEliminacionComponent } from '../../dialogos/confirmar-eliminacion/confirmar-eliminacion.component';
import { ConfirmarActivarDesactivarComponent } from '../../dialogos/confirmar-ActivarDesactivar/confirmar-activarDesactivar.component';

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
    MatSortModule,
    MatSlideToggleModule
    ],
})
export class ArticuloListComponent implements OnInit {
  columnas: string[] = ['id', 'descripcion', 'precio','imagen','fechaAlta','fechaEdicion','editar','onOff'];
  datos: Array<Articulo> = [];
  mensaje = '';
  classBackgroundColor = 'mensajeSuccess';
  checked: boolean = false;
  //datos: Articulo[] = [];
  //dataSource:any;
  dataSource!: MatTableDataSource<Articulo, MatPaginator>;
constructor (private articulosServicio: ArticulosService,public dialog: MatDialog){}
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
  abrirDialogo(data:Articulo|undefined|null) {
    const dialogo1 = this.dialog.open(ArticuloDialogoComponent,{data:data});
    dialogo1.afterClosed().subscribe(re => {
      if (re){
        this.articulosServicio.Get().subscribe((result: any) => {
        this.datos = result.data;
        this.dataSource = new MatTableDataSource<Articulo>(this.datos);
        this.dataSource.sort = this.sort;
        });
      }
    });
  }
  borrar(codigo: number) {
    let findByCodigo = this.datos.find(v => v.id == codigo);    
    if (findByCodigo === undefined) {
      this.mensaje = 'No se encontró el artículo para eliminar';
      this.classBackgroundColor = 'mensajeError';
      return;
      }
    const dialogo2 = this.dialog.open(ConfirmarEliminacionComponent, { data: findByCodigo });
    dialogo2.afterClosed().subscribe(re => {
      if (re){
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
    });
  }
  change(e: any, data: Articulo) {
    let msj = e.checked ? 'Activar' : 'Desactivar';
    const mensaje = `estas segudo de ${msj} este artículo??`
    const dialogo1 = this.dialog.open(ConfirmarActivarDesactivarComponent,{data:mensaje});
    dialogo1.afterClosed().subscribe(re => {
      if (re) {
        data.activo = e.checked;
        this.articulosServicio.ActivarDesactivar(data).subscribe((result: any) => {
          this.mensaje = result.mensaje;
        });
      }
      else {
        e.source.checked = !e.checked;
        
        var fess = '';
      }
    });



    // if (this.checked) {
    //   if (confirm("Are you sure")) {
    //     this.checked = !this.checked;
    //     console.log("toggle")
    //   }
    //   else {
    //     e.source.checked = true;
    //     console.log("toggle should not change if I click the cancel button")
    //   }
    // } else {
    //   this.checked = !this.checked;
    // }
  }
}

// export class Articulo {
//   constructor(public codigo: number, public descripcion: string, public precio: number) {
//   }
// }