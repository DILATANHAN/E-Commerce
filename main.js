import { addToCart,displayCartTotal,renderCartItems} from "./js/cart.js";
import { fetchProducts, renderProducts } from "./js/products.js";

document.addEventListener("DOMContentLoaded", async () => {
  if(window.location.pathname.includes("cart.html")){
   renderCartItems();
   displayCartTotal();
  } else {
    //* Eger sayfa cart.html sayfasinda degilse urunleri al.
    const products = await fetchProducts();
    //* Urunleri render et ve addToCartCallback fonksiyonu tanimla
   renderProducts(products, (event) => addToCart(event, products));
  }
}) ;