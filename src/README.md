# ZON.UZ — React + Redux (DummyJSON integration)

This `src/` folder is a ready set of React components and Redux slices that integrate with DummyJSON endpoints:
- Products: https://dummyjson.com/products
- Product detail: https://dummyjson.com/products/:id
- Carts: https://dummyjson.com/carts
- Categories: built-in categories used in sidebar
- Search: https://dummyjson.com/products/search?q=...

## How to use
1. Create a Vite React app or your preferred React setup.
2. Replace the `src/` with this folder's `src/`.
3. Install dependencies:
   - `npm install react-router-dom @reduxjs/toolkit react-redux`
4. Run dev server:
   - `npm run dev`

Notes:
- Wishlist and local cart are persisted to `localStorage`.
- DummyJSON endpoints are public demo APIs; POST/PUT/DELETE are simulated.
