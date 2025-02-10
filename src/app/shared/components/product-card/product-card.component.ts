import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemaProduct, ClothingProduct, RestaurantMenuItem, GroceryProduct, isClothing, isMenuItem, isGrocery } from '../../models/product.model';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="card">
        <img [src]="product().image?.[0] || 'assets/no-image.png'" 
             class="card-img-top object-fit-cover" 
             style="height: 180px;"
             [alt]="product().name">
             
      <div class="card-body d-flex flex-column">
        
        <h5 class="card-title">{{ product().name }}</h5>

          @if (clothingData(); as p) {
              <span class="card-text"><strong>Size:</strong> {{ p.size }}</span>
              <span><strong>Color:</strong> {{ p.color }}</span>
          }

          @if (menuData(); as p) {
            <p class="card-text">
              <strong>Ingredients:</strong> {{ p.ingredients }}
            </p>
          }

          @if (groceryData(); as p) {
            <div class="card-text"><strong>GTIN:</strong> {{ p.gtin13 }}</div>
          }

        <div class="d-flex justify-content-between align-items-center pt-2 border-top border-dark-subtle">
          <span class="fw-bold text-dark">
            {{ product().offers?.price }} {{ product().offers?.priceCurrency }}
          </span>
          <button class="btn btn-sm btn-light border shadow-sm">Details</button>
        </div>
      </div>
    </article>
  `,
  styles: [`
    :host { display: block; width: 260px; }
  `]
})
export class ProductCardComponent {
  product = input.required<SchemaProduct>();
  clothingData = computed(() => isClothing(this.product()) ? this.product() as ClothingProduct : null);
  menuData = computed(() => isMenuItem(this.product()) ? this.product() as RestaurantMenuItem : null);
  groceryData = computed(() => isGrocery(this.product()) ? this.product() as GroceryProduct : null);
}