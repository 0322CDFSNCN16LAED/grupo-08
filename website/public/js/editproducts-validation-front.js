var checkbox = document.getElementById("rooms");

//defino la variable validacion con todos los campos que son obligatorios
const validations = [
    {
      inputName: "name",
      validations: [
        {
          validator: (input) => input.value.trim() != "",
          errorMsg: "Debe ingresar un nombre del producto de minimo 5 caracteres",
        },
        {
          validator: (input) => input.value.length >= 5,
          errorMsg: "Debe ingresar un nombre de minimo 5 caracteres",
        },
  
      ],
    },
    {
      inputName: "categoryId",
      validations: [
        {
          validator: (input) => input.value.trim() != "",
          errorMsg: "Debe elegir una opcion",
        },
      ],
    },
   {
      inputName: "rooms",
      validations: [
        {          
          errorMsg: "Debe seleccionar al menos una opcion Rooms",
          validator: (input) => {
            let isValid = false;
            input.forEach((element) => {
              if (element.checked) {
                console.log("si valido 1");
                isValid = true;
              }
            });
            console.log("valor de retorno-->" + isValid);
            return isValid;
        },
      },
     ],
    },
    {
      inputName: "styleId",
      validations: [
        {
          validator: (input) => input.value.trim() != "",
          errorMsg: "Debe ingresar alguna opcion valida",
        },
      ],
    },
    {
      inputName: "price",
      validations: [
        {
          validator:(input) => input.value.trim() != "",
          errorMsg: "Debe ingresar el precio del producto de manera numerica",
        },
        {
          validator: (input) => input.value > 0,
          errorMsg: "Debe ser de manera numerica",
        },
      ],
    },
    {
      inputName: "installmentId",
      validations: [
        {
          validator: (input) => input.value.trim() != "",
          errorMsg: "Debe ingresar alguna opcion valida",
        },
        
      ],
    },
    {
      inputName: "brandId",
      validations: [
        {
          validator:(input) => input.value.trim() != "",
          errorMsg: "Debe ingresar alguna opcion valida",
        },
     ],
    },
    {
      inputName: "description",
      validations: [
        {
          validator: (input) => input.value.trim() != "",
          errorMsg: "Debe dar una breve descripcion del producto de minimo 20 caracteres",
        },
        {
          validator: (input) => input.value.length >= 20,
          errorMsg: "Debe descripcion minima de 20 caracteres",
        },
  
      ],
    },
    {
      inputName: "colourId",
      validations: [
        {
          validator: (input) => input.value.trim() != "",
          errorMsg: "Debe ingresar alguna opcion valida",
        },
        
      ],
    },
    {
      inputName: "picture",
      validations: [
          {   
              validator: (input) => /.(gif|jpeg|jpg|png)$/i.test(input.value) != "",
              errorMsg: "Debe ingresar un archivo válido (JPG, JPEG, PNG, GIF).",
          },
      ],
  },
  {
    inputName: "price",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debe ingresar el precio del producto de manera numerica",
      },
      {
        validator: (input) => input.value > 0,
        errorMsg: "Debe ser de manera numerica",
      },
    ],
  },
  {
    inputName: "installmentId",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debe ingresar alguna opcion valida",
      },
    ],
  },
  {
    inputName: "colourId",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debe ingresar alguna opcion valida",
      },
    ],
  },
  {
    inputName: "categoryId",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debe elegir una opcion",
      },
    ],
  },
  {
    inputName: "styleId",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debe ingresar alguna opcion valida",
      },
    ],
  },
  {
    inputName: "brandId",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debe ingresar alguna opcion valida",
      },
    ],
  },
  {
    inputName: "description",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg:
          "Debe dar una breve descripcion del producto de minimo 20 caracteres",
      },
      {
        validator: (input) => input.value.length >= 20,
        errorMsg: "Debe descripcion minima de 20 caracteres",
      },
    ],
  },
  {
    inputName: "rooms",
    validations: [
      {
        errorMsg: "Debe seleccionar al menos una opcion Rooms",
        validator: (input) => {
          let isValid = false;
          input.forEach((element) => {
            if (element.checked) {
              console.log("si valido 1");
              isValid = true;
            }
          });
          console.log("valor de retorno-->" + isValid);
          return isValid;
        },
      },
    ],
  },
];


window.onload = function () {
  const formularioCreat = document.querySelector("form.form-field"); // me traigo la clase de la vista del formualario

  formularioCreat.name.focus();

  formularioCreat.addEventListener("submit", (event) => {
    //event.preventDefault();
    const errores = [];
    let i = 1;
    //Hago el proceso de validacion
    validations.forEach((inputToValidate) => {
      const input = formularioCreat[inputToValidate.inputName];
      //hago un for of para que me recorra todos los elementos de la variable validacion of todos los elementos a iterar y luego cuando temrine de recorrer y no encuentre errores para a la segunda parte
      for (const validation of inputToValidate.validations) {
        const isValid = validation.validator(input);
        if (!isValid) {
          i++;
          errores.push(validation.errorMsg);
          event.preventDefault();
          //como los campos son validos quiero que me deje de seleccionar la clase donde aparece invalid y agregue la valida
          if (inputToValidate.inputName == "rooms") {
            document.querySelector("#errorRoom").innerHTML =
              validation.errorMsg;
          } else {
            //para el resto de inputs
            input.parentElement.classList.add("is-invalid");
            input.parentElement.classList.remove("is-valid");
            input.parentElement.querySelector(".error").innerHTML =
              validation.errorMsg;
          }
          return;
        }
      }
      //cuando termina el for of quiere decir que no hay mas errores
      input.parentElement.classList.add("is-valid");
      input.parentElement.classList.remove("is-invalid");
      input.parentElement.querySelector(".error").innerHTML = "";
      document.querySelector("#errorRoom").innerHTML = "";
    });

    //Si no fallaron las validaciones
    if (errores.length == 0) {
      formularioCreat.submit();
    } else {
      console.log(errores);
    }
  });
};
