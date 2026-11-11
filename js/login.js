let email = document.querySelector("#Email")
let password = document.querySelector("#Password")

let getemail = localStorage.getItem("email")
let getpassword = localStorage.getItem("password")

let BtnLogin = document.querySelector("#BtnLogin")

BtnLogin.addEventListener("click",function (e) {
    e.preventDefault()

    if (email.value ==="" || password.value ==="" ) {
        alert("Plese fill data")
    }
    else{
        if ((getemail && getemail.trim() === email.value)&&(getpassword && getpassword.trim() === password.value)) {
            setTimeout(() =>{
                window.location.assign("index.html")
            },1000)
        }
        else{
            alert("soory,the username or password me wrong")
        }
    }
})



