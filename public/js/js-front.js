window.addEventListener("load", function(){

    let formularioLogIn = document.querySelector("form.form-field");
    let formularioRegister = document.querySelector("form.form-register");

    formularioLogIn.addEventListener("submit", function(e){

        let errores = [];

        let inputEmail = document.querySelector("input.email");

        if(inputEmail.value == ""){
            errores.push("Debe ingresar un e-mail");
        }

        let inputPassword = document.querySelector("input.pass");
        if(inputPassword.value == "" ){
            errores.push("Debe ingresar una contraseña");
        }

        if(errores.length > 0) {
            e.preventDefault();
        }

        let ulErrores = document.querySelector("div.errores ul");
        for(let i = 0; i< errores.length; i++){
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>" 
        }
    })

    formularioRegister.addEventListener("submit", function(e){

        let errores = [];

        let inputEmailRegister = document.querySelector("input.email");

        if(inputEmailRegister.value == ""){
            errores.push("Debe ingresar un e-mail");
        }

        let inputPassword = document.querySelector("input.pass");
        if(inputPassword.value == "" ){
            errores.push("Debe ingresar una contraseña");
        }

        if(errores.length > 0) {
            e.preventDefault();
        }

        let ulErrores = document.querySelector("div.errores ul");
        for(let i = 0; i< errores.length; i++){
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>" 
        }
    })


})