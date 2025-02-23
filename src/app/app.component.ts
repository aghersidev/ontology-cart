import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CartDrawerComponent } from "./cart-drawer/cart-drawer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CartDrawerComponent],
  template: `
    <nav>
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
      <a routerLink="/catalogue" routerLinkActive="active">Catalogue</a>
    </nav>

    <main>
      <router-outlet></router-outlet><router-outlet />
<app-cart-drawer />

    </main>
  `
})
export class AppComponent { }