
import{
  calculateCartTotal,getCartFromLocalStorage, saveToLocalStorage, updateCartIcon, } from "./utlis.js";

let cart = getCartFromLocalStorage();
 //* Sepete urun ekleyecek fonksiyondur.

export function addToCart(event,  products){
    //* Tikladigimiz urunun id `sine eristik.Ve id sini number tipine cevirdik
    const productID =parseInt(event.target.dataset.id); 
    //* Products dizisi icerisinden id sine ulastigimiz urunu bulabilmak icin find metodunu kullandik.
   const product = products.find((product) => product.id === productID) ; 
   //* Urunu bulursak bu if calisacak 
   if (product){
    //* SEpette onceden ekledigimiz urunu find methodu ile bulduk
    const exitingItem = cart.find((item) => item.id === productID) ;
    //* Sepette bu urunden daha once varsa if calisacak.
    if(exitingItem){
        //* Miktarini 1 arttirir.
        exitingItem.quantity++;
    }else{
        //*Sepette bu urunden daha once yoksa sepete yeni bir urun ekleyecegiz.
        //* Sepet dizisine ekleyecegimiz urunun miktar ozelligini ekledik.
             const cartItem = {
            id:product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1,
     };
     //* Cart dizisine yeni olusturdugumuz objeyi gonderdik
     cart.push(cartItem);
      event.target.textContent = "Added"; //* Ekleme butonunun icerigini degistirdik.
      updateCartIcon(cart);
      saveToLocalStorage(cart);
      renderCartItems();
      displayCartTotal();
    }
   }
 }
  //* Sepetten urun siler
 function removeFromCart(event){
      //* Silecegimiz elemanin id sine eristik.
    const productID =parseInt(event.target.dataset.id);
    //* Tikladigimiz elemani sepetten kaldir.
    cart= cart.filter((item) => item.id !== productID);
    //* localStorage i guncelle.
    saveToLocalStorage(cart); 
    //* Sayafayi guncelle.  
    renderCartItems(); 
    displayCartTotal();
    updateCartIcon(cart);
     }

     function changeQuantity(event){
      //* Inputun icerisinde ki degeri aldik
      const quantity = parseInt(event.target.value);
      //* Degisim olan urunun id sine eristik
      const productID = parseInt(event,target,dataset.id);

      if(quantity > 0){
        const cartItem = cart.find((item) => item.id === productID);
        if(cartItem) {
          cartItem.quantity = quantity;
          saveToLocalStorage(cart);
          displayCartTotal();
          updateCartIcon(cart);
        }
      }
     }
  //*Sepette ki urunleri ekrana renderler.
export function renderCartItems() {
  //*id'sine gore HTML etiketini aldik.
 const cartItemsElement = document.getElementById("cartItems");
 //* Sepette ki herbir urun icin ekrana birmtane cart-item bileseni aktardik.
  cartItemsElement.innerHTML = cart
  .map(
    (item) =>  `
 <div class="cart-item">
 <img
 src="${item.image}"
 alt=""
 />

 <div class="cart-item-info">
  <h2 class="cart-item-title">${item.title} </h2>
  <input 
  type="number" 
  min="1"
  value="${item.quantity}"
  class="cart-item-quantity"
  data-id="${item.id}"
  />
 </div>
 <h2>$${item.price}</h2>
 <button class="remove-from-cart" data-id="${item.id} ">Remove</button>
</div

 `)
 .join("");

 //* tum  silme butonlarini aldik.
 const removeButtons = document.getElementsByClassName("remove-from-cart");
 for(let i = 0; i < removeButtons.lenght; i++) {
  //* index numarasina gore butun silme butonlarini sectik
  const removeButton = removeButtons[i]; 
//*Her bir buton icin olay izleyicisi ekle ve bir fonksiyon calistir.
  removeButton.addEventListener("click", removeFromCart); 
 }

 const quantityInputs = document.getElementsByClassName("cart-item-quantity");
 console.log(quantityInputs);
 for(let i = 1; i < quantityInputs.length; i++){
  const quantityInput =quantityInputs[i];
  console.log(quantityInput);

  quantityInput.addEventListener("change", changeQuantity);
 }

 updateCartIcon(cart);
}

export function displayCartTotal(){
  const cartTotalElement =document.getElementById("cartTotal");
  const total = calculateCartTotal(cart);
  cartTotalElement.textContent = `
  Total: $${total.toFixed(2)}`;
}