 export function saveToLocalStorage(cart) {
    //* Localstorage veri ekleme 
    localStorage.setItem("cart",JSON.stringify(cart));
}

 export function getCartFromLocalStorage(){  
    //* localStorage da cart adinda bir key varsa onlari json formantinda getir.
    //* Yoksa da bos bir dizi dondur. 
   return JSON.parse(localStorage.getItem("cart")) || [];
}

   //* Sepette ki urun miktarini hesaplar
 export function updateCartIcon(cart){
   console.log(cart);
   const cartIcon = document.getElementById("cart-icon");
   const i = document.querySelector(".bx-shopping-bag");
   console.log(i);
   let totalQuantity =cart.reduce((sum,item) => sum+item.quantity,0);
   console.log(totalQuantity);
   i.setAttribute("data-quantify",totalQuantity);
 }

 export function calculateCartTotal(cart){
   return cart.reduce((sum,item) => sum + item.price * item.quantity, 0);
 }
 