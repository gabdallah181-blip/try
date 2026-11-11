
let acount = document.querySelector(".acount")
let userInfo =document.querySelector("#user-info")
let user =document.querySelector("#user")

if (localStorage.getItem("firstname")) {
    acount.remove()
    userInfo.style.display = "flex"
    user.innerHTML =localStorage.getItem("firstname")
}

let BtnLogOut = document.querySelector("#logout")
BtnLogOut.addEventListener("click",function(){
    localStorage.clear()
    
    setTimeout(() =>{
        window.location.assign("login.html")
    },1000)
})