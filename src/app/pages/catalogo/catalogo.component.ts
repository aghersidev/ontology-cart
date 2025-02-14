import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRepositoryService } from '../../core/services/product-repository.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { SchemaProduct } from '../../shared/models/product.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <section class="container">
      <h1>Catalogue of Products</h1>

      <div class="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-4">
      
       @for (item of products(); track item.name) {
          <app-product-card [product]="item" />
        } @empty {
          <p>No products found.</p>
        }
      </div>
    </section>
  `,
})
export class CatalogoComponent implements OnInit {
  private productRepoService = inject(ProductRepositoryService);
  
  products = signal<SchemaProduct[]>([]);

  ngOnInit(): void {
    this.productRepoService.getProducts().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error(err)
    });
  }
}