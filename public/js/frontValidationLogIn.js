const validationsLogIn = [
    {
        inputName: "email",
        validationsLogIn: [
            {   
                validator: (input) => input.value.trim() != "",
                errorMsg: "Debe ingresar un correo electrónico",
            },
            {   
                validator: (input) => input.value.isEmail,
                errorMsg: "Debe ingresar un correo electrónico válido",
            },
        ],
    },
    {
        inputName: "password",
        validationsLogIn: [
            {   
                validator: (input) => input.value.trim() != "",
                errorMsg: "Debe ingresar una contraseña",
            },
        ],
    },
];

window.onload = function(){

    const formularioLogIn = document.querySelector("form.form-field");

    formularioLogIn.addEventListener("submit", (evt)=>{

        evt.preventDefault();
        const errores = [];

        // hago validaciones

        validationsLogIn.forEach((inputToValidate)=>{
            const input = formularioLogIn[inputToValidate.inputName];
            for (const validation of inputToValidate.validationsLogIn) {
                const isValid = validation.validator(input);
                if(!isValid){
                    errores.push(validation.errorMsg);
                    input.parentElement.classList.add("is-invalid");
                    input.parentElement.classList.remove("is-valid");
                    input.parentElement.querySelector(".error").innerHTML = validation.errorMsg;
                    return;
                }
                input.parentElement.classList.remove("is-invalid");
                input.parentElement.classList.add("is-valid");
                input.parentElement.querySelector(".error").innerHTML = "";
            }         
        });

        // si no fallan

        if(errores.length == 0){
            formularioLogIn.submit();
        } else {
            console.log("errores");
        }
    })
}