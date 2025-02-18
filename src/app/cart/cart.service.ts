import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, CartProductRef } from '../shared/models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly KEY = 'cart';
  private items: CartItem[] = [];
  private subject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.subject.asObservable();

  constructor() { this.load(); }

  private load() {
    const raw = localStorage.getItem(this.KEY);
    if (!raw) return;
    try {
      this.items = JSON.parse(raw);
      this.subject.next([...this.items]);
    } catch {
      this.items = [];
      localStorage.removeItem(this.KEY);
    }
  }

  private sync() {
    localStorage.setItem(this.KEY, JSON.stringify(this.items));
    this.subject.next([...this.items]);
  }

  addToCart(ref: CartProductRef, qty = 1) {
    const item = this.items.find(i => i.ref.id === ref.id);
    if (item) item.quantity += qty;
    else this.items.push({ ref, quantity: qty });
    this.sync();
  }

  remove(id: string) {
    this.items = this.items.filter(i => i.ref.id !== id);
    this.sync();
  }

  clear() {
    this.items = [];
    localStorage.removeItem(this.KEY);
    this.subject.next([]);
  }

  total(): number {
    return this.items.reduce((t, i) => t + i.ref.price * i.quantity, 0);
  }

  snapshot(): CartItem[] {
    return [...this.items];
  }
}
