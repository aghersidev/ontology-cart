import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart/cart.service';
import { CartUiService } from '../cart/cart-ui.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (ui.open()) {
      <div class="backdrop" (click)="ui.hide()"></div>

      <aside class="drawer">
        <header>
          <h3>Cart</h3>
          <button (click)="ui.hide()">✕</button>
        </header>

        <section class="items">
          @for (item of cartItems(); track item.ref.id) {
            <div class="item">
              <div>
                <strong>{{ item.ref.name }}</strong>
                <small>{{ item.quantity }} × {{ item.ref.price }} {{ item.ref.currency }}</small>
              </div>
              <button (click)="cart.remove(item.ref.id)">🗑</button>
            </div>
          } @empty {
            <p class="empty">Your cart is empty</p>
          }
        </section>

        <footer>
          <div class="total">
            Total: {{ total() }}
          </div>
          <button class="checkout" [disabled]="cartItems().length === 0">
            Checkout
          </button>
        </footer>
      </aside>
    }
  `,
  styles: [`
    .backdrop {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.4);
    }
    .drawer {
      position: fixed; top: 0; right: 0;
      width: 360px; height: 100%;
      background: white;
      display: flex; flex-direction: column;
      box-shadow: -4px 0 16px rgba(0,0,0,.2);
    }
    header, footer { padding: 1rem; border-bottom: 1px solid #ddd; }
    footer { border-top: 1px solid #ddd; margin-top: auto; }
    .items { padding: 1rem; flex: 1; overflow: auto; }
    .item { display: flex; justify-content: space-between; margin-bottom: .75rem; }
    .checkout { width: 100%; padding: .75rem; }
    .empty { text-align: center; color: #777; }
  `]
})
export class CartDrawerComponent {
  cart = inject(CartService);
  ui = inject(CartUiService);

  cartItems = computed(() => this.cart.snapshot());
  total = computed(() =>
    this.cartItems().reduce((t, i) => t + i.ref.price * i.quantity, 0)
  );
}
