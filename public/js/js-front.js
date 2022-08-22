window.addEventListener("load", function(){

    let formulario = document.querySelector("form.form-field");

    formulario.addEventListener("submit", function(e){

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

})