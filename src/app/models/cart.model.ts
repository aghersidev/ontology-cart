import { Offer } from './product.model';

export interface CartProductRef {
  '@type': string;
  id: string;
  name: string;
  price: number;
  currency: string;
  availability?: Offer['availability'];
  sku?: string;
}

export interface CartItem {
  ref: CartProductRef;
  quantity: number;
}
