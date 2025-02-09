import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemaProduct, ClothingProduct, RestaurantMenuItem, GroceryProduct, isClothing, isMenuItem, isGrocery } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="card">
      <div class="image-container">
        <img [src]="product().image?.[0] || 'assets/no-image.png'" [alt]="product().name">
        <span class="type-badge">{{ product()['@type'] }}</span>
      </div>

      <div class="content">
        <h3>{{ product().name }}</h3>

        @if (clothingData(); as p) {
          <div class="specs clothing">
            <span><strong>Size:</strong> {{ p.size }}</span>
            <span><strong>Color:</strong> {{ p.color }}</span>
          </div>
        }

        @if (menuData(); as p) {
          <div class="specs food">
            <small><strong>Ingredients:</strong> {{ p.ingredients }}</small>
          </div>
        }

        @if (groceryData(); as p) {
          <div class="specs grocery">
            <small><strong>GTIN:</strong> {{ p.gtin13 }}</small>
          </div>
        }

        <div class="footer">
          <span class="price">
            {{ product().offers?.price }} {{ product().offers?.priceCurrency }}
          </span>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .specs { margin-top: 10px; padding: 8px; border-radius: 4px; font-size: 0.85rem; }
    .clothing { background: #e3f2fd; color: #1565c0; }
    .food { background: #f1f8e9; color: #33691e; }
    .grocery { background: #fff3e0; color: #e65100; }
  `]
})
export class ProductCardComponent {
  product = input.required<SchemaProduct>();
  clothingData = computed(() => isClothing(this.product()) ? this.product() as ClothingProduct : null);
  menuData = computed(() => isMenuItem(this.product()) ? this.product() as RestaurantMenuItem : null);
  groceryData = computed(() => isGrocery(this.product()) ? this.product() as GroceryProduct : null);
}