import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemaProduct, ClothingProduct, RestaurantMenuItem, GroceryProduct, isClothing, isMenuItem, isGrocery } from '../../models/product.model';
import { CartService } from '../../services/cart/cart.service';
import { toCartRef } from '../../services/cart/cart.mapper';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./product-card.component.html",
  styles: [`
    :host { display: block; width: 260px; }
  `]
})
export class ProductCardComponent {
  product = input.required<(SchemaProduct & { id: string })>();
  clothingData = computed(() => isClothing(this.product()) ? this.product() as ClothingProduct : null);
  menuData = computed(() => isMenuItem(this.product()) ? this.product() as RestaurantMenuItem : null);
  groceryData = computed(() => isGrocery(this.product()) ? this.product() as GroceryProduct : null);

  constructor(private cart: CartService) {}

  addToCart() {
    const ref = toCartRef(this.product());
    this.cart.addToCart(ref);
    console.log('Added to cart:', ref);
  }}