let cartButton = document.querySelector(".cart-button");
let cartModal = document.querySelector(".cart-modal");
let panier = [];
cartButton.addEventListener("click", () => {
  //la fonction qu'on veut executer sur le click de ce bouton
  //ajouter la classe active a la liste des classes du modal
  //on accede a la liste des classes du modal on utilisant la propriete classList de l'object cartModal selectionné
  cartModal.classList.toggle("active");
});

//affichage des produits
//1. selectionner la section ou on va afficher les produits

let productsContainer = document.querySelector(".products");
//2. recuperer les produits via un fetch d'une API externe
//la fonction fetch va envoyer une requete get al'url specifié (https://dummyjson.com/products)
//res.json() va les recuperer sous format json
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((res) => {
    //recuperer le tableau des produit dans une variable
    let myProducts = res.products;

    //parcourir le tableau avec forEach
    //je passe une fonction en parametre a forEach en mettant () =>{} a l'interieur des parentheses
    myProducts.forEach((e) => {
      //injecter une nouvel div de produit a chaque iteration
      //le += est pour dire n'ecrase pas mais rajoute la div a la fin
      productsContainer.innerHTML += `
            <div class="product-card">
        <div class="product-image">
          <img src="${e.thumbnail}" alt="" />
        </div>
        <p>${e.title}</p>
        <div class="rating">
     

        </div>
        <h3>${e.price}$</h3>
       <input id="${e.id}" type="button" value="ADD TO CART">
      </div>
            `;
    });

    //Gestion du panier

    //selectionner les boutons
    let addToCartButtons = document.querySelectorAll(".product-card input");
    //parcourir le tableau pour rajouter un event listener pour chaque bouton
    addToCartButtons.forEach((e) => {
      //on rajoute un event listener pour chaque element
      e.addEventListener("click", (event) => {
        //quand on clique, on recupere le id du boutons cliqué
        //on declare un variable qui va contenir le id
        let clickedProductId = parseInt(event.target.getAttribute("id"));
        //faire une recherche dans le tableau qui continet tous les produits pour recuper les autres informations du produit
        let clickedProduct = myProducts.filter(
          (e) => e.id === clickedProductId
        )[0];
        //declarer une variable qui va contenir les ids et quantité et prix des produit ajoutés au panier
        //c'est la variable panier déclarée au debut
        //verifier si le clickedProductId existe dans le tableau panier
        let cartResult = panier.filter((e) => e.id === clickedProductId);
        if (cartResult.length === 0) {
          //id non trouvé dans le tableau, donc on le rajoute
          //inserer une nouvel div dans l'html du modal qui est le panier
          cartModal.innerHTML += `<div class="modal-item">
            <h3>${clickedProduct.title}</h3>
            <div class="quantity">
              <i id="${clickedProductId}" class="fa-solid fa-minus"></i>
              <p>1</p>
              <i id="${clickedProductId}" class="fa-solid fa-plus"></i>
            </div>
            <p>${clickedProduct.price} $</p>
          </div>`;
          //rajouter le produit dans le tableau panier
          panier.push({
            id: clickedProductId,
            price: clickedProduct.price,
            quantity: 1,
          });
        } else {
          //id trouvé dans le paier donc on alerte l'utilisateur
          alert("Product already exists in the cart");
        }
      });
    });
  });
