function getRating(r) {
  let roundedR = Math.round(r);
  let result = "";
  for (i = 1; i <= 5; i++) {
    if (i <= roundedR) {
      result += '<i class="fa-solid fa-star"></i>';
    } else {
      result += '<i class="fa-regular fa-star"></i>';
    }
  }
  return result;
}

function getProductByID(products, id) {
  let result;
  products.forEach((e) => {
    if (e.id == id) {
      result = e;
    }
  });
  return result;
}

let cartButton = document.querySelector(".cart-button");
let cartModal = document.querySelector(".cart-modal");
let cart = [];
function addQuantity(id) {
  cart = cart.map((e) => {
    if (e.id == id) {
      e.quantity++;
    }
    return e;
  });
}

cartButton.addEventListener("click", () => {
  cartModal.classList.toggle("active");
});
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((res) => {
    let myProducts = res.products;
    let productsContainer = document.querySelector(".products");

    myProducts.forEach((e) => {
      productsContainer.innerHTML += `
    <div class="product-card">
        <div class="product-image">
          <img src="${e.thumbnail}" alt="" />
        </div>
        <p>${e.title}</p>
        <div class="rating">
        ${getRating(e.rating)}

        </div>
        <h3>${e.price}$</h3>
       <input id="${e.id}" type="button" value="ADD TO CART">
      </div>
  `;
    });
    let addToCartButtons = document.querySelectorAll(".product-card input");
    addToCartButtons.forEach((e) => {
      e.addEventListener("click", (event) => {
        let clickedProductID = parseInt(event.target.getAttribute("id"));
        let clickedProduct = getProductByID(myProducts, clickedProductID);
        let exists = false;
        cart.forEach((e) => {
          if (e.id == clickedProductID) {
            exists = true;
          }
        });
        if (exists) {
          alert(`This product already in your cart`);
        } else {
          cart.push({
            id: clickedProductID,
            price: clickedProduct.price,
            quantity: 1,
          });
          cartModal.innerHTML += `<div class="modal-item">
            <h3>${clickedProduct.title}</h3>
            <div class="quantity">
              <i id="${clickedProductID}" class="fa-solid fa-minus"></i>
              <p>1</p>
              <i id="${clickedProductID}" class="fa-solid fa-plus"></i>
            </div>
            <p>${clickedProduct.price} $</p>
          </div>`;
        }
        let pluses = document.querySelectorAll(".fa-plus");
        console.log(pluses);

        pluses.forEach((p) => {
          p.addEventListener("click", (event) => {
            let clickedPlusId = parseInt(event.target.getAttribute("id"));
            addQuantity(clickedPlusId);
            let clickedQuantity = event.target.parentNode.querySelector("p");
            clickedQuantity.innerHTML++;
          });
        });
      });
    });
  });
