let acount = document.querySelector(".acount")
let userInfo = document.querySelector("#user-info")
let user = document.querySelector("#user")

const SaveFirstname = localStorage.getItem("firstname")
const SaveLastname = localStorage.getItem("lastname")
const SaveEmail = localStorage.getItem("email")
const SavePassword = localStorage.getItem("password")

if (localStorage.getItem("firstname")) {
    acount.remove()
    userInfo.style.display = "flex"
    user.innerHTML = localStorage.getItem("firstname")
}

let BtnLogOut = document.querySelector("#logout")

BtnLogOut.addEventListener("click", function () {

    localStorage.clear()

    setTimeout(() => {
        window.location.assign("login.html")
    }, 1000)

    // localStorage.setItem("firstname", SaveFirstname)
    // localStorage.setItem("lastname", SaveLastname)
    // localStorage.setItem("email", SaveEmail)
    // localStorage.setItem("password", SavePassword)

})


// Products

let allproducts = document.querySelector(".products")

let products = [
    {
        id: 1,
        imgUrl:"images/Espresso.jpeg",
        title: "Espresso",
        price: "10$",
        category: "coffee"
    },
    {
        id: 2,
        imgUrl: "images/latte.jpeg",
        title: "Latte",
        price: "15$",
        category: "coffee"
    },
    {
        id: 3,
        imgUrl: "images/Espresso Macchiato.jpeg",
        title: "Espresso Macchiato",
        price: "10$",
        category: "coffee"
    },
    {
        id: 4,
        imgUrl: "images/latte Macchiato.jpeg",
        title: "latte Macchiato",
        price: "15$",
        category: "coffee"
    },
    
    {
        id: 5,
        imgUrl: "images/Turkish coffe.jpeg",
        title: "Turkish Coffe",
        price: "10$",
        category: "coffee"
    },
    {
        id: 6,
        imgUrl: "images/Ice latte.jpeg",
        title: "Ice Latte",
        price: "20$",
        category: "coffee"
    },
    {
        id: 7,
        imgUrl:"images/frappucciono.jpeg",
        title: "Frappucciono",
        price: "25$",
        category: "coffee"
    },
    {
        id: 8,
        imgUrl:"images/coffe Mocha (2).jpeg",
        title: "coffe Mocha",
        price: "25$",
        category: "coffee"
    },
    {
        id: 9,
        imgUrl:"images/coffe mocha.jpeg",
        title: "Coffe Mocha",
        price: "20$",
        category: "coffee"
    }
]


// Cart Elements

let CarCount = document.querySelector(".count")

let CartsProductsDiv = document.querySelector("#carts-products div")

let ShoppingCartIcon = document.querySelector("#shopping-cart .cart")

let CartsProducts = document.querySelector("#carts-products")

// Get Products From Local Storage
let ProductsInCart=localStorage.getItem("ProductsInCart")
let addItem = ProductsInCart ? JSON.parse(ProductsInCart) : []

// //////////////////// favorite Items
let FavoriteItems = localStorage.getItem("FavoriteItems") ? JSON.parse(localStorage.getItem("FavoriteItems")) : []

// Draw Products

function drawItem() {

    let y = products.map((item) => {

        let isExist = addItem.find((pr) => pr.id === item.id)

        return `
        <div class="product-item">

            <img src="${item.imgUrl}" alt="">

            <div class="product-info">

                <div class="info">
                    <p>${item.title}</p>
                    <p>${item.price}</p>
                    <p>${item.category}</p>
                </div>

                <div class="add-product">

                    <i class="fa-solid fa-heart 
                    ${FavoriteItems.some((fav) => fav.id === item.id) ? "active" : ""}"
                    onclick="toggleFavorite(${item.id}, this)">
                    </i>

                    <button
                        class="add_to_cart"
                        onclick="toggleCart(${item.id})"
                        style="${isExist ? 'background-color:red' : ''}">

                        ${isExist ? 'Remove from Cart' : 'Add to Cart'}

                    </button>

                </div>

            </div>

        </div>
        `

    }).join("")

    allproducts.innerHTML = y

}
// ////////////////////// favorite items
function toggleFavorite(id, icon) {

    let chosenItem = products.find((item) => item.id === id);

    let check = FavoriteItems.find((item) => item.id === id);

    if (check) {

        FavoriteItems = FavoriteItems.filter((item) => item.id !== id);

        icon.classList.remove("active");

    }
    else {

        FavoriteItems.push(chosenItem);

        icon.classList.add("active");

    }

    localStorage.setItem("FavoriteItems", JSON.stringify(FavoriteItems));

}
// ///////////////////////////////////////////search
let searchType = document.querySelector("#searchType");
let searchInput = document.querySelector("#searchInput");
let searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", function () {

    let searchValue = searchInput.value.toLowerCase().trim();
    if (searchValue ==="") {
        drawItem();
        return;
    }

    else if (searchType.value === "name") {

        let searchResult = products.filter((item) =>
            item.title.toLowerCase().includes(searchValue)
        );

        drawSearchResult(searchResult);

    }

    else if (searchType.value === "category") {

        let searchResult = products.filter((item) =>
            item.category.toLowerCase().includes(searchValue)
        );

        drawSearchResult(searchResult);

    }

});

function drawSearchResult(result) {

    let y = result.map((item) => {

        return `
            <div class="product-item">
                <img src="${item.imgUrl}" alt="">

                <div class="product-info">
                    <div class="info">
                        <p>${item.title}</p>
                        <p>${item.price}</p>
                        <p>${item.category}</p>
                    </div>

                    <div class="add-product">
                        <i class="fa-solid fa-heart"></i>

                        <button class="add_to_cart"
                            onclick="addToCart(${item.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>`
        ;

    }).join("");

    allproducts.innerHTML = y;
}
// //////////////////////////////////////////////////////////////

// Add Or Remove Product

function toggleCart(id) {

    if (localStorage.getItem("firstname")) {

        let chosenItem = products.find((item) => item.id === id)

        let isExist = addItem.find((item) => item.id === id)

        if (isExist) {

            addItem = addItem.filter((item) => item.id !== id)

        }

        else {

            addItem = [...addItem, chosenItem]

        }

        localStorage.setItem("ProductsInCart", JSON.stringify(addItem))

        drawItem()  

        updateCart()

    }

    else {

        window.location = "register.html"

    }

}


// Update Cart

function updateCart() {

    CartsProductsDiv.innerHTML = ""

    addItem.forEach((item) => {

        CartsProductsDiv.innerHTML += `<p>${item.title}</p>`

    })

    CarCount.innerHTML = addItem.length

    if (addItem.length > 0) {

        CarCount.style.display = "block"

    }

    else {

        CarCount.style.display = "none"

    }

}


// Show And Hide Cart

ShoppingCartIcon.addEventListener("click", showproducts)

function showproducts() {

    if (addItem.length > 0) {

        if (CartsProducts.style.display === "block") {

            CartsProducts.style.display = "none"

        }

        else {

            CartsProducts.style.display = "block"

        }

    }

}

// Run Functions

drawItem()

updateCart()