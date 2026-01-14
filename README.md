
# Ontology Shop - Angular Demo

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

[🌐 View project](https://aghersidev.github.io/ontology-cart/)

Welcome to **Ontology Shop**, a small demo storefront built with **Angular**. This project demonstrates a product catalog, a drawer-style shopping cart, and simple services for product repository and caching.

## Main Features

- Product catalog with fallback data
- Drawer-style shopping cart (add, change quantity, remove)
- Cart UI service and mapper for state management
- Responsive layout

## How to clone and run locally

1. Clone and install dependencies:
```bash
git clone https://github.com/aghersidev/ontology-cart.git
cd ontology-cart
npm install
ng serve
```

2. Open the URL shown in the console (usually):
```bash
http://localhost:4200
```

## Customization

- Edit the home page content in `src/app/pages/home/home.component.html` to change welcome text and instructions.
- Update product data in `public/data/products-fallback.json` (or the data source used by the repository service).
- Modify styles in `src/styles.css` and component styles under `src/app`.

## Project structure (high level)

- `src/app/components/cart-drawer` — cart drawer component and template
- `src/app/components/product-card` — product card component
- `src/app/pages/catalogo` — product listing page
- `src/app/pages/home` — home page
- `src/app/services` — cache, product repository, cart services
- `public/data` — fallback product JSON

## License

This project is licensed under the MIT License.

---
