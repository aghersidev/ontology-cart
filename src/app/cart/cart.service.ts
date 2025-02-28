import { Injectable, signal, computed } from '@angular/core';
import { CartItem, CartProductRef } from '../shared/models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly KEY = 'cart';
  private items = signal<CartItem[]>(this.load());

  cart = this.items.asReadonly();

  addToCart(ref: CartProductRef, qty = 1) {
    this.items.update(items => {
      const i = items.find(x => x.ref.id === ref.id);
      if (i) i.quantity += qty;
      else items.push({ ref, quantity: qty });
      this.persist(items);
      return [...items];
    });
  }

  remove(id: string) {
    this.items.update(items => {
      const next = items.filter(i => i.ref.id !== id);
      this.persist(next);
      return next;
    });
  }

  clear() {
    this.items.set([]);
    localStorage.removeItem(this.KEY);
  }

  private persist(items: CartItem[]) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
  }

  private load(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) ?? '[]');
    } catch {
      return [];
    }
  }
}
