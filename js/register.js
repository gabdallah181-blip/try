let firstname = document.querySelector("#FirstName")
let lastname = document.querySelector("#LastName")
let email = document.querySelector("#Email")
let password = document.querySelector("#Password")

let BtnRegister = document.querySelector("#BtnRegister")

BtnRegister.addEventListener("click",function (e) {
    e.preventDefault()

    if (firstname.value === "" || lastname.value === "" || email.value === "" || password.value === "" ) {
        alert("Please fill data")
    }
    else{
        localStorage.setItem("firstname",firstname.value)
        localStorage.setItem("lastname",lastname.value)
        localStorage.setItem("email",email.value)
        localStorage.setItem("password",password.value)

        setTimeout(() => {
            window.location.replace("index.html")
        },1000)
    }
})












