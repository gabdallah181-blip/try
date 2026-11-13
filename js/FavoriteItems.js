// ضفنا كل اللي عملناه في فانكشن علشان 
(function () {
    // علشان المتغير ده متعرف في script.js  favotiteitems.js
    //  والفانكشن دي بتستدعي نفسها بنفسها
    let allproducts = document.querySelector(".products");

    let FavoriteItems = JSON.parse(localStorage.getItem("FavoriteItems")) || [];
    
    let count = document.querySelector("#shopping-cart .count")
    count.remove()
    ShoppingCartIcon.remove()
    function drawFavorites() {
    
        let y = FavoriteItems.map((item) => {
            return `
            <div class="product-item">
                <img src="${item.imgUrl}" alt="">
    
                <div class="product-info">
                    <p>${item.title}</p>
                    <p>${item.price}</p>
                    <p>${item.category}</p>
    
                    <i class="fa-solid fa-heart  i-fav
                        ${FavoriteItems.some((fav) => fav.id === item.id) ? "active" : ""}"
                        onclick="removeFavorite(${item.id}, this)">
                        </i>
                </div>
            </div>`
        }).join("");
    
        allproducts.innerHTML = y;
    }
    
    window.removeFavorite = function(id) {
    
        FavoriteItems = FavoriteItems.filter(item => item.id !== id);
    
        localStorage.setItem("FavoriteItems", JSON.stringify(FavoriteItems));
    
        drawFavorites();
    }
    
    drawFavorites();
})()