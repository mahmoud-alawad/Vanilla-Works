const productsContainer = document.querySelector('.products-holder')
const nav = document.querySelector('nav')
const cartContainer = document.querySelector('.cart')
const amountTotal = document.querySelector('.amout_items_total')
const cartTotal = document.querySelector('.cart-total')
const cartIcon = document.querySelector('.nav-cart')
const closeCart = document.querySelector('.close-cart');
const priceContainer = cartContainer.querySelector('.price')
const overlay = document.createElement('div')
const body = document.getElementsByTagName('body')[0].appendChild(overlay)
const toTopBtn = document.querySelector('.to-top-button')
const modal = document.querySelector('.modal')
const modalText = modal.querySelector('.message')
const modalClose = modal.querySelector('.close')

"use strict";

let price;
let cart = [];
//ui buttonsArrays
let buttonsDomUi = [];
let buttonsDomCart = [];


let cartfull = false;

        //to calculate items
        let tempTotal = 0,
    itemsTotal = 0
            

class Product{
    getProductsfun = async () => {
        try {
            const res = await fetch('../data/products.json')
            const products = await res.json();
                return products;
        } catch (error) {
            console.log(error.message);
        }
        
    }
}

class Ui {
    showProducts(arr) {
        let result = ''
        arr.forEach(product => {
            const { image, name, price,id } = product;
            result += `<div div class='product flex-col' >
            <div class="img-box">
                <img class="mouse" src="${image}" alt=".." />
            </div>
            <div class="product-content flex-col">
                <div class="flex title">
                    <h2>${name}</h2>
                    </div>
                <div class="flex title">
                    <p>description</p>
                    </div>
                <div class="flex-bt">
                    <span class="product-price">${price}$</span> 
                    <a href="#" class="product-add-to-cart flex" data-id=${id}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></a>
                </div>
            </div>
    
    </div >`;
        });
        productsContainer.innerHTML = result;
    }

    //getting all buttons 
    getCardButtons() {
        //UI buttons
        const btns = [...productsContainer.querySelectorAll(".product-add-to-cart")];
        buttonsDomUi = btns;

        //looping on UI buttons
        btns.forEach(btn => {
            const btnId = parseInt(btn.dataset.id)

            btn.addEventListener('click', (e) => {
                cartContainer.parentElement.classList.add('active')

                //parsing price and update it on screen
                price = parseInt(e.target.parentElement.parentElement.firstChild.innerText) 

                //getting product from storage base on id from selected product
                let cartItem = { ...Storage.getProduct(btnId), amount: 1 };
                //update cart array
                cart = [...cart, cartItem];

                //storing products in storage cart
                Storage.saveCartItem(cart);
                Storage.savePrices(tempTotal, itemsTotal);

                //adding product to cart__
                this.addCartItem(cart);
                    modal.classList.add('active')
                //disable button
                let inCart = cart.find(item => item.id === btnId)
                    if (inCart) {
                            modalText.innerHTML = `${inCart.name} added to cart`

                        btn.disabled = true
                        btn.innerText = 'adedd to cart'
                    } 
            })
        })
    }



//adding items to cart
    addCartItem(item) {

        //update price and total items 
        item.map(e => {
            tempTotal += e.price * e.amount;
            itemsTotal += e.amount
        })

        //create article for selected product
        let article = document.createElement('article');
            article.classList.add('flex-bt','product-cart')
        item.map(({ image, name, price, amount, id }) => {
            article.innerHTML = `
                <header class="flex-col">
					<div class="remove flex">
						<img src="${image}" alt=".." width="80px">
					</div>
                    </header>
                    <div class="content">
                        <h3>${name}</h3>
                    </div>
				<div class="controllers flex">
                        <span class="qt-minus">-</span>
                        <span class="qt">${amount}</span>
                        <span class="qt-plus">+</span>
                    </div>
                <a href="#" class="flex product-remove-btn" data-id=${id}">remove</a>
            `;
            return cartContainer.querySelector('.products-cart-holder').appendChild(article)
            
        });
                    //total items inCart
                cartTotal.innerText = itemsTotal

        cartContainer.querySelector('.price').innerHTML = `
            <h4>total is <span>${tempTotal}</span>$</h4> 
            <button>remove all</button>
        `;
        
        cartContainer.insertBefore(article, cartContainer.querySelector('.products-cart-holder'));
        
        
                //getting all delete buttons 
            const btns = [...cartContainer.querySelectorAll(".product-remove-btn")];
            buttonsDomCart = btns;

            buttonsDomCart.forEach(btn => {
                const btnId = parseInt(btn.dataset.id)
                //add listener to remove product from cart
                btn.addEventListener('click', (e) => {
                    e.target.parentElement.innerHTML = ''
                    Storage.removeProduct(btnId)
                })
            })
        
    }

    //update state on cart
    initCart() {
        //checking if items already in storage
        if (localStorage.getItem('cartItem') && localStorage.getItem('cartTotalItems') && localStorage.getItem('cartPrices')) {
            //getting cart items from storage
            let cartItems = JSON.parse(localStorage.getItem('cartItem'))
            let price = JSON.parse(localStorage.getItem('cartPrices'))
            let cartTotalItems = JSON.parse(localStorage.getItem('cartTotalItems'))

            //mapping
            cartItems.map((item) => {
                const { image, name, price, amount, id } = item;
                let article = document.createElement('article');
                article.classList.add('flex','product-cart')
                article.innerHTML = `
                <header class="flex">
					<div class="remove flex">
						<img src="${image}" alt=".." width="80px">
					</div>
                    </header>
                    <div class="">
                        <h3>${name}</h3>
                    </div>
				<div class="controllers flex">
                        <span class="qt-minus">-</span>
                        <span class="qt">${amount}</span>
                        <span class="qt-plus">+</span>
                    </div>
                <a href="#" class="flex product-remove-btn" data-id=${id}">remove</a>
            `;
                
            cartContainer.querySelector('.price').innerHTML = `
            <div class="flex-bt">
                <h1>your total is <span>${tempTotal}</span>$</</h1>
                <button>remove all</button>
            </div>
            `;
            cartContainer.insertBefore(article, cartContainer.querySelector('.products-holder'));
            cartTotal.innerText = amount * cartItems.length
            return cartContainer.querySelector('.products-cart-holder').appendChild(article)
            
            });

            
            //update listeners after saving products in storage
            [...document.querySelectorAll('.product-remove-btn')].forEach(btn => {
                const btnId = parseInt(btn.dataset.id)
                
                btn.addEventListener('click', (e) => {
                    e.target.parentElement.innerHTML = ''
                    this.initCart();
                    Storage.removeProduct(btnId)
                })
            })
            
        }
        
    }
    //hide cart
    closeCart() {
        cartContainer.classList.remove('active')
    }
    //show cart
    showCart() {
        cartContainer.classList.add('active')
    }

    //nav  and to top button
    showNav() {
        if (window.scrollY > 70) {
            nav.classList.add('active')     
            toTopBtn.classList.add('active')
        } else {
            nav.classList.remove('active')           
            toTopBtn.classList.remove('active')

            }

    }

    // back top top screen
    toTopHandler() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    closeModal() {
        modal.classList.remove('active')
    }
}

cartIcon.addEventListener('click', () => {
    const ui = new Ui();
    ui.showCart();
    overlay.classList.add('overlay')
})

closeCart.addEventListener('click', () => {
    const ui = new Ui();
    ui.closeCart();
    overlay.classList.remove('overlay')

})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('active')
    }
    if (event.target == nav) {
        nav.classList.remove('active')
    }
}

//Storage 
class Storage{
    //save the ui products
    static saveProduct(product) {
        localStorage.setItem("product", JSON.stringify(product));
    }
    //to save the cart items 
    static saveCartItem(cartItem) {
        localStorage.setItem('cartItem', JSON.stringify(cartItem));
    }
    //update price
    static savePrices(totalPrice,totalItems) {
        localStorage.setItem('cartPrices', JSON.stringify(totalPrice));
        localStorage.setItem('cartTotalItems', JSON.stringify(totalItems));
    }
    //filter products 
    static removeProduct(id) {
        if (localStorage.getItem('cartItem')) {
            let cartItem = JSON.parse(localStorage.getItem('cartItem'))
            let index = cartItem.findIndex((item)=> {
                    return item.id === id;
                })
            if (index !== -1) cartItem.splice(index, 1);
            this.saveCartItem(cartItem)
        }
    }

    //get product base on id
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('product'));
        let productFilterId = products.find(product => {
            return product.id === id;
        })
        return productFilterId;
    }

    static getCartItem(id) {
        let cartItems = JSON.parse(localStorage.getItem('cartItem'));
        let productFilterId = cartItems.find(product => {
            return product.id === id;
        })
        return productFilterId;
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const product = new Product();
    const ui = new Ui();
    window.addEventListener('scroll', () => ui.showNav())
    toTopBtn.addEventListener('click',()=> ui.toTopHandler())
    modalClose.addEventListener('click',()=> ui.closeModal())
    productsContainer.classList.add('active')

    product.getProductsfun().then(products => {
        ui.showProducts(products)
        Storage.saveProduct(products)
    }).then(() => {
        ui.getCardButtons();
        ui.initCart();
    })
})