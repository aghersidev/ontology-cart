import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Home - Store'
  },
  {
    path: 'catalogue',
    loadComponent: () => import('./pages/catalogo/catalogo.component').then(m => m.CatalogoComponent),
    title: 'Products'
  },
  {
    path: '**',
    redirectTo: ''
  }
];