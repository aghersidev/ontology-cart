import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRepositoryService } from '../../services/product-repository.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CartUiService } from '../../services/cart/cart-ui.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <section class="container">
      <h1>Catalogue of Products</h1>

      <div class="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-4">
      
       @for (item of products(); track item.id) {
          <app-product-card [product]="item" />
        } @empty {
          <p>No products found.</p>
        }
      </div><button class="btn btn-dark mb-3" (click)="openCart()">
  View Cart
</button>

    </section>
  `,
})
export class CatalogoComponent {
  private productRepoService = inject(ProductRepositoryService);

  products = toSignal(
    this.productRepoService.getProducts(),
    { initialValue: [] }
  );


  private cartUi = inject(CartUiService);

  openCart() {
    this.cartUi.show();
  }

}