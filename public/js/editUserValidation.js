//defino la variable validacion con todos los campos que son obligatorios
const validations = [
  {
    inputName: "name",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debe ingresar un Nombre",
      },
      {
        validator: (input) => input.value.length > 4,
        errorMsg: "Debe ingresar un nombre de minimo 2 caracteres",
      },
    ],
  },
  {
    inputName: "lastname",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debe ingresar un Apellido",
      },
    ],
  },
  {
    inputName: "phoneNumber",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debe ingresar un Teléfono",
      },
    ],
  },
  {
    inputName: "address",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debe ingresar una Dirección",
      },
    ],
  },
  {
    inputName: "city",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debe ingresar la Ciudad",
      },
    ],
  },
  {
    inputName: "state",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debe ingresar la Provincia",
      },
    ],
  },
  {
    inputName: "country",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debe ingresar el País",
      },
    ],
  },
  {
    inputName: "zipCode",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debe ingresar Código Postal",
      },
    ],
  },
];

window.onload = function () {
  const formularioCreat = document.querySelector("form.form-field"); // me traigo la clase de la vista del formualario

  formularioCreat.name.focus();

  formularioCreat.addEventListener("submit", (event) => {
    event.preventDefault();
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
          //para el resto de inputs
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
      formularioCreat.submit();
    } else {
      console.log(errores);
    }
  });
};
