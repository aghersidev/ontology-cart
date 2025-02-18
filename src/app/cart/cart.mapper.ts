import { SchemaProduct } from '../shared/models/product.model';
import { CartProductRef } from '../shared/models/cart.model';

export function toCartRef(p: SchemaProduct & { id: string }): CartProductRef {
  if (!p.offers) throw new Error('Product without offer');
  return {
    '@type': p['@type'],
    id: p.id,
    name: p.name,
    price: p.offers.price,
    currency: p.offers.priceCurrency,
    availability: p.offers.availability,
    sku: p.sku
  };
}
