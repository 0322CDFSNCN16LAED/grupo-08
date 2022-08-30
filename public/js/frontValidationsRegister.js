const validationsRegister = [
    {
        inputName: "name",
        formularioRegister: [
            {   
                validator: (input) => input.value.trim() != "",
                errorMsg: "Debe ingresar un nombre",
            },
            {   
                validator: (input) => input.value >= 2,
                errorMsg: "Debe ingresar más de 2 caracteres",
            },
        ],
    },
    {
        inputName: "lastname",
        formularioRegister: [
            {   
                validator: (input) => input.value.trim() != "",
                errorMsg: "Debe ingresar un apellido",
            },
            {   
                validator: (input) => input.value >= 2,
                errorMsg: "Debe ingresar más de 2 caracteres",
            },
        ],
    },
    {
        inputName: "email",
        formularioRegister: [
            {   
                validator: (input) => input.value.trim() != "",
                errorMsg: "Debe ingresar un correo electrónico",
            },
            {   
                validator: (input) => input.value != "",
                errorMsg: "Debe ingresar un correo electrónico válido",
            },
        ],
    },
    {
        inputName: "password",
        formularioRegister: [
            {   
                validator: (input) => input.value.trim() != "",
                errorMsg: "Debe ingresar una contraseña",
            },
            {   
                validator: (input) => input.value >= 2,
                errorMsg: "Debe ingresar una contraseña mayor a 8 caracteres",
            },
        ],
    },
    {
        inputName: "profilePic",
        formularioRegister: [
            {   
                validator: (input) => input.value.isFile,
                errorMsg: "Debe ingresar un archivo válido (JPG, JPEG, PNG, GIF).",
            },
        ],
    },
];

window.onload = function(){

    const formularioRegister = document.querySelector("form.form-field");

    formularioRegister.addEventListener("submit", (evt)=>{

        evt.preventDefault();
        const errores = [];

        // hago validaciones

        validationsRegister.forEach((inputToValidate)=>{
            const input = formularioRegister[inputToValidate.inputName];
            for (const validation of inputToValidate.formularioRegister) {
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
            formularioRegister.submit();
        } else {
            console.log("errores");
        }
    })
}