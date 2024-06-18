
import { element } from "./helpers.js";

export function renderProducts(products) {
element.productList.innerHTML = products
        .map(
        (product) => `
        <div class="product">
        <img
          src=${product.image}
          alt=""
          class="product-img"
        />
        <div class="product-info">
          <h2 class="product-title">${product.title} </h2>
          <p class="product-price">${product.price} </p>
          <a class="add-to-cart">Add to cart</a>
        </div>
      </div>   
        `
    )
    .join("");
}