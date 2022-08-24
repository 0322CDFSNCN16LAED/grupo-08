window.addEventListener("load", function(){

    let formularioLogIn = document.querySelector("form.form-field");
    let formularioRegister = document.querySelector("form.form-field");

    formularioLogIn.addEventListener("submit", function(event){

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
            event.preventDefault();
        }

        let ulErrores = document.querySelector("div.errores ul");
        for(let i = 0; i< errores.length; i++){
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>" 
        }
    })

    formularioRegister.addEventListener("submit", function(event){

        let errores = [];

        let nameRegister = document.querySelector("input.name");

        if(nameRegister.value == ""){
            errores.push("Debe ingresar un e-mail");
        }

        let lastNameRegister = document.querySelector("input.lastname");

        if(lastNameRegister.value == ""){
            errores.push("Debe ingresar un e-mail");
        }

        let inputEmailRegister = document.querySelector("input.email");

        if(inputEmailRegister.value == ""){
            errores.push("Debe ingresar un e-mail");
        }

        let inputPassword = document.querySelector("input.password");
        if(inputPassword.value == "" ){
            errores.push("Debe ingresar una contraseña");
        }

        let inputProfilePic = document.querySelector("input.profilePic");
        if(inputProfilePic.value == "" ){
            errores.push("Debe seleccionar una imagen de perfil");
        }

        if(errores.length > 0) {
            event.preventDefault();
        }

        let ulErrores = document.querySelector("div.errores ul");
        for(let i = 0; i< errores.length; i++){
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>" 
        }
    })
})