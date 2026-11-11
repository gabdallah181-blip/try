let allproducts = document.querySelector(".products")

let CarCount = document.querySelector(".count")

let CartsProductsDiv = document.querySelector("#carts-products div")


// Get Products From Local Storage

let ProductsInCart = localStorage.getItem("ProductsInCart")

let product = ProductsInCart ? JSON.parse(ProductsInCart) : []


// Draw Products

function drawItem() {

    let y = product.map((item) => {

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
                    <button
                        style="background-color:red"
                        class="remove_from_cart"
                        onclick="removefromcart(${item.id})">

                        Remove from Cart

                    </button>

                </div>

            </div>
        </div>        
        `

    }).join("")

    allproducts.innerHTML = y

    if (product.length === 0) {

        allproducts.innerHTML =`<p>Your Cart Is Empty</p>`

    }

}
///////////////////// total price
let TotalPrice = document.querySelector("#total-price")
function GetTotalPrice(product) {
    let total= product.reduce((sum, item)=>{
        return sum + parseFloat(item.price)
    },0)

    TotalPrice.innerHTML = total + "$"
}

// Remove Product From Cart

function removefromcart(id) {

    product = product.filter((item) => item.id !== id)

    localStorage.setItem("ProductsInCart", JSON.stringify(product))

    drawItem()

    updateCart()

    GetTotalPrice(product)

}


// Update Cart

function updateCart() {

    CartsProductsDiv.innerHTML = ""

    product.forEach((item) => {

        CartsProductsDiv.innerHTML += `<p>${item.title}</p>`

    })

    CarCount.innerHTML = product.length

    if (product.length > 0) {

        CarCount.style.display = "block"

    }

    else {

        CarCount.style.display = "none"

    }

}

// Run Functions

drawItem()

updateCart()
GetTotalPrice(product)