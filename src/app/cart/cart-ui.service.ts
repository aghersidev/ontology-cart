import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartUiService {
  open = signal(false);

  show() { this.open.set(true); }
  hide() { this.open.set(false); }
  toggle() { this.open.update(v => !v); }
}
