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
        validator: (input) => input.value.length > 4,
        errorMsg: "Debe ingresar un nombre de minimo 5 caracteres",
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
    inputName: "sale",
    validations: [
      {
        validator: (input) => input.value.trim() != "",
        errorMsg: "Debe ingresar un valor",
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
];

window.onload = function () {
  const formularioCreat = document.querySelector("form.form-field"); // me traigo la clase de la vista del formualario
  //console.log("rooms" + formularioCreat.rooms);
  formularioCreat.name.focus();

  formularioCreat.addEventListener("submit", (event) => {
    //event.preventDefault();
    const errores = [];
    let i = 1;
    //Hago el proceso de validacion
    validations.forEach((inputToValidate) => {
      const input = formularioCreat[inputToValidate.inputName];
      //console.log("estp es el input" + input.name);
      //hago un for of para que me recorra todos los elementos de la variable validacion of todos los elementos a iterar y luego cuando temrine de recorrer y no encuentre errores para a la segunda parte
      for (const validation of inputToValidate.validations) {
        const isValid = validation.validator(input);
        //console.log("imŕime 1" + input);
        if (!isValid) {
          i++;
          errores.push(validation.errorMsg);
          event.preventDefault();
          //como los campos son validos quiero que me deje de seleccionar la clase donde aparece invalid y agregue la valida
          if (inputToValidate.inputName != "rooms") {
            input.parentElement.classList.add("is-invalid");
            input.parentElement.classList.remove("is-valid");
            input.parentElement.querySelector(".error").innerHTML =
              validation.errorMsg;
          } else {
            console.log("el input a evaluar" + input.name);
            //para el resto de inputs
            document.querySelector("#errorRoom").innerHTML =
              validation.errorMsg;
          }
          return;
        }
      }
      console.log("el nombre delinput" + input.name);
      if (input.name !== undefined) {
        input.parentElement.querySelector(".error").innerHTML = "";
        input.parentElement.classList.add("is-valid");
        input.parentElement.classList.remove("is-invalid");
      } else {
        console.log("asasasas" + document.querySelector("#errorRoom"));
        document.querySelector("#errorRoom").innerHTML = "";
      }
    });

    //Si no fallaron las validaciones
    console.log("errores" + errores.length);
    if (errores.length == 0) {
      formularioCreat.submit();
    } else {
      console.log(errores);
    }
  });
};
