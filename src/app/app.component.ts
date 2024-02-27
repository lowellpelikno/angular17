import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ArticulosService } from './services/articulos.service';
import { Articulo } from './interface/articulo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular.ruter';
  mensaje = '';
  //articulos: Array<Articulo> =[];
  //articulos: any;
  //articulos2: any;
  //constructor(private articulosServicio: ArticulosService) { 
    //this.articulosServicio.InitializeData();

  //   const requestOptions = {
  //   method: "GET",
  //   redirect: "follow"
  //   };

  // fetch("http://PortaFolioJesusIvan.somee.com/api/Articulos", requestOptions)
  // .then((response) => response.text())
  // .then((result) => console.log(result))
  // .catch((error) => console.error(error));


  //   this.articulosServicio.Get().subscribe((result: any) => {
  //     if (!result.success) {
  //       this.mensaje = 'ocurrio un error en el servidor';
  //       return;
  //     }
      
  //     this.articulos = result.data;
  //   });
  //   //this.articulosServicio.Get2().subscribe((result:any) => this.articulos2 = result);
  //   console.log(this.articulos);
  //    //console.log(this.articulos2);
  // }


  
}
