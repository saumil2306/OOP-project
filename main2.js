let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Nike dri-fit Jacket',
        tag: 'dri-fit Jacket',
        price: 2995,
        inCart: 0
    },
    {
        name: 'Nike PSG',
        tag: 'PSG',
        price: 7051,
        inCart: 0
    },
    {
        name: 'Adidas Hoodie',
        tag: 'Hoodie',
        price: 3295,
        inCart: 0
    },
    {
        name: 'Adidas Climacool',
        tag: 'Climacool',
        price: 1295,
        inCart: 0
    }

];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);

    })

}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product

            }

        }
        cartItems[product.tag].inCart += 1;
    }
    else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }

    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let productnull = document.querySelector(".productnull");
    let cartCost = localStorage.getItem('totalCost');
    if( cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="products" style="width: 250px; display:-webkit-box; margin-bottom: 23px; border-bottom: 2px solid lightgrey;">
            <img src="imgs/${item.tag}.webp" style="width: 250px;">
            <span>${item.name}</span>
            <div class="price" style="width: 100px; display:flex; align-items: center; justify-content: center;border-bottom: 2px solid lightgrey; margin-bottom: -2px;">${item.price}</div>
            <div class="quantity" style="width: 135px; display:flex; align-items: center; justify-content: center;border-bottom: 2px solid lightgrey; margin-bottom: -2px;">${item.inCart}</div>
            <div class="total" style="width: 230px; display:flex; align-items: center; justify-content: center;border-bottom: 2px solid lightgrey; margin-bottom: -2px;">${item.inCart * item.price}</div>
            </div>
            
            ` 
        });

        productContainer.innerHTML += `
        
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle" style="display: flex;justify-content: end;">
                Cart total Rs. ${cartCost}.00
            </h4>
        </div>

        `
    }
    else{
        productnull.innerHTML = `
        <div class="productnull">
        <h2 style="display: flex;justify-content: center;margin-top: 23px;margin-bottom: 23px;">Your cart is empty</h2>
        </div>
        `
    }

}

onLoadCartNumbers();
displayCart();
