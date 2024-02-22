import { Routes } from '@angular/router';
import { ArticuloComponent } from './articulos/articulo/articulo.component';
import { ArticuloListComponent } from './articulos/articuloList/articuloList.component';
import { HomeComponent } from './home/home.component';
import { ArticuloEditarComponent } from './articulos/articuloEditar/articuloEditar.component';
import { Pagina404Component} from './pagina404/pagina404.component';

export const routes: Routes = [
  {
  path: '',
  component: HomeComponent
  },
  {
  path: 'home',
  component: HomeComponent
  },
  {
    path: 'articulo-list',
    component: ArticuloListComponent
  },
  {
  path: 'articulo-crear',
  component: ArticuloComponent
  },
  {
  path: 'articulo-editar/:cod',
  component: ArticuloEditarComponent
  },
  {
    path: 'pagina404',
    component: Pagina404Component
  },
  {
  path: '**',
  redirectTo:'pagina404'
  },
  
];
