import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './cart.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  cart$ = this.cart.cart$;
  total$ = this.cart.cart$.pipe(map(() => this.cart.total()));

  constructor(public cart: CartService) {}
}
