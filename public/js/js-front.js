const validationsLogIn = [
    {
        inputName: "email",
        validationsLogIn: [
            {   
                validator: (input) => input.value.trim != "",
                errosMsg: "Debe ingresar un correo electrónico",
            },
            {   
                validator: (input) => input.value.isEmail,
                errosMsg: "Debe ingresar un correo electrónico válido",
            },
        ],
    },
    {
        inputName: "password",
        validationsLogIn: [
            {   
                validator: (input) => input.value.trim != "",
                errosMsg: "Debe ingresar una contraseña correo electrónico",
            },
        ],
    },
],


window.onload = function(){

    const formularioLogIn = document.querySelector("form.form-field");
    //const formularioRegister = document.querySelector("form.form-field");

    formularioLogIn.email.focus()

    formularioLogIn.addEventListener("submit", (evt)=>{

        evt.preventDefault();
        const errores = [];

        // hago validaciones

        if(!formularioLogIn.email.value.trim()){
            errores.push("Debe ingresar un correo electrónico");
            formularioLogIn.email.parentElement.classList.add("is-invalid");
            formularioLogIn.email.parentElement.classList.remove("is-valid");
            formularioLogIn.email.querySelector(".errorValidation").innerHTML = "Debe ingresar un correo electrónico";
        } else {
            formularioLogIn.email.parentElement.classList.add("is-valid");
            formularioLogIn.email.parentElement.parent.classList.remove("is-invalid");
            formularioLogIn.email.nextSibling.innerHTML = "";
        }

        // si no fallan

        if(errores.length == 0){
            formularioLogIn.submit();
        } else {
            console.log("errores");
        }
        

    })



    /*formularioLogIn.addEventListener("submit", function(event){

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
    })*/
})