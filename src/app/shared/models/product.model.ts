/**
 * @see https://schema.org/Product
 */
export interface SchemaProduct {
  "@context": "https://schema.org";
  "@type": "Product" | "MenuItem" | "IndividualProduct";
  name: string;
  description?: string;
  image?: string[];
  brand?: Brand;
  offers?: Offer;
  url?: string;
  sku?: string;
}

export interface Brand {
  "@type": "Brand";
  name: string;
}

export interface Offer {
  "@type": "Offer";
  price: number;
  priceCurrency: string; // "USD", "EUR"
  availability?: "https://schema.org/InStock" | "https://schema.org/OutOfStock" | "https://schema.org/LowStock";
}

/**
 * Especialization
 */
export interface GroceryProduct extends SchemaProduct {
  gtin13?: string;
  expirationDate?: string;
  nutrition?: NutritionInformation;
}

/**
 * Especialization
 */
export interface ClothingProduct extends SchemaProduct {
  color?: string;
  size?: string; 
  material?: string; 
}

/**
 * Especialization
 * @see https://schema.org/MenuItem
 */
export interface RestaurantMenuItem extends Omit<SchemaProduct, "@type"> {
  "@type": "MenuItem";
  ingredients?: string;
  suitableForDiet?: string[]; // Ej: ["https://schema.org/VeganDiet"]
  nutrition?: NutritionInformation;
}

export interface NutritionInformation {
  "@type": "NutritionInformation";
  calories?: string;
  fatContent?: string;
  proteinContent?: string;
}

export type AnyProduct = GroceryProduct | ClothingProduct | RestaurantMenuItem;

export function isClothing(product: any): product is ClothingProduct {
  return product && (product.color !== undefined || product.size !== undefined);
}

export function isMenuItem(product: any): product is RestaurantMenuItem {
  return product && product['@type'] === 'MenuItem';
}

export function isGrocery(product: any): product is GroceryProduct {
  return product && (product.gtin13 !== undefined || product.nutrition !== undefined);
}