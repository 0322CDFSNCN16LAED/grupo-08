const isEmpty = (input) => input.value.trim() != "";

//defino la variable validacion con todos los campos que son obligatorios
const validations = [
  {
    inputName: "name",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debe ingresar un nombre del producto de minimo 5 caracteres",
      },

    ],
  },
  {
    inputName: "categoryId",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debe elegir una opcion",
      },
    ],
  },
  /*{
    inputName: "rooms",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debe seleccionar al menos una opcion",
      },
      {
        validator: (input) => input.check > 0,
        errorMsg: "Debe seleccionar al menos una opcion",
      },
    ],
  },*/
  {
    inputName: "styleId",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debe ingresar alguna opcion valida",
      },
    ],
  },
  {
    inputName: "price",
    validations: [
      {
        validator: isEmpty,
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
        validator: isEmpty,
        errorMsg: "Debe ingresar alguna opcion valida",
      },
      
    ],
  },
  {
    inputName: "brandId",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debe ingresar alguna opcion valida",
      },
   ],
  },
  {
    inputName: "description",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debe dar una breve descripcion del producto de minimo 20 caracteres",
      },
     
    ],
  },
  {
    inputName: "colourId",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debe ingresar alguna opcion valida",
      },
      
    ],
  },
];

window.onload = function () {
  const formularioCreat = document.querySelector("form.form-field");// me traigo la clase de la vista del formualario
  
  formularioCreat.name.focus()

  formularioCreat.addEventListener("submit", (event) => {
   //event.preventDefault();
    const errores = [];

    //Hago el proceso de validacion
    validations.forEach((inputToValidate) => {
      const input = formularioCreat[inputToValidate.inputName];
      
      //hago un for of para que me recorra todos los elementos de la variable validacion of todos los elementos a iterar y luego cuando temrine de recorrer y no encuentre errores para a la segunda parte 
      for (const validation of inputToValidate.validations) {
        
        const isValid = validation.validator(input);
        if (!isValid) {
          errores.push(validation.errorMsg);
          event.preventDefault();
          //como los campos son validos quiero que me deje de seleccionar la clase donde aparece invalid y agregue la valida
          input.parentElement.classList.add("is-invalid");
          input.parentElement.classList.remove("is-valid");
          input.parentElement.querySelector(".error").innerHTML =
            validation.errorMsg;
          return;
        }
      }
      //cuando termina el for of quiere decir que no hay mas errores
      input.parentElement.classList.add("is-valid");
      input.parentElement.classList.remove("is-invalid");
      input.parentElement.querySelector(".error").innerHTML = "";
    });

    //Si no fallaron las validaciones
    if (errores.length == 0) {

       console.log("hola");
      
    } else {
      console.log(errores);
    }
  });
};