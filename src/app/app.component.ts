import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BarraLateralComponent } from "./barra-lateral/barra-lateral.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, RouterLink, BarraLateralComponent]
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
