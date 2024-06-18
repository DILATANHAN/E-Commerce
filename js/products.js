export async function fetchProducts() {
    try {
        // db.json dosyasina fetch ile istek attik
        const response = await fetch("db.json");

        if(!response.ok){
            //Hata olusturduk
            throw new Error("URL yanlis");
        }
        // Gelen cevabi json formatina cevirdik ve return ettik.
        return await response.json();
    } catch (error) {
        console.error(error);
        return[];
    }
} 
//* Urunlerin sayfaya render eden fonksiyonu tanimliyoruz.
export function renderProducts(products,addToCartCallback) {
    // * HTML dosyasindan urunlerin listelenecegi elementi seceriz.
    const productList =document.getElementById("productList");
  
    //* Urunlerin HTML formatinda listeleye eklenmesi icin products dizisini donup her bir product icin ekrana product cartini aktaririz
    productList.innerHTML = products
            .map(
            (product) => `
            <div class="product">
            <img
              src="${product.image}"
              alt=""
              class="product-img"
            />
            <div class="product-info">
              <h2 class="product-title">${product.title} </h2>
              <p class="product-price">${product.price} </p>
              <a class="add-to-cart" data-id="${product.id} ">Add to cart</a>
            </div>
          </div>   
            `
        )
        .join("");
        //* "Add to cart" butonlari seciliyor
        const addToCartButtons =document.getElementsByClassName("add-to-cart");
        //*her bir "Add to cart" butonuna tiklanma olayi ekleniyor
       
        for(let i=0; i< addToCartButtons.length; i++){
            const addToCartButton = addToCartButtons[i];
            addToCartButton.addEventListener("click" ,addToCartCallback);
        }
    }