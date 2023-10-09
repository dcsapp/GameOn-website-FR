function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
// ------------------------------------------------------------
const modalContent = document.querySelector(".modal-body");
const modalConfirmation = document.querySelector(".formConfirmation");
const formInput = document.querySelectorAll("input");

// ----

// const formRegistration = document.querySelector("form");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal without updating
function closeModal() {
  modalbg.style.display = "none";
}
// Select and add an event listener to each close modal X (2: form and confirmation)
const closeModalBtn = document.querySelectorAll(".close");
console.log("close buttons", closeModalBtn);

closeModalBtn.forEach(function (btn) {
  btn.addEventListener("click", closeModal());
});

// Form submission
// submit form button triggers validate function
const form = document.querySelector("#form");
form.addEventListener("submit", function (e) {
  validate(e);
});

// Button handling
function closeConfirmationModal() {
  modalConfirmation.style.display = "none";
}
// Confirmation modal
const btnCloseConfirmation = document.querySelector(".btn-closeConfirmation");
btnCloseConfirmation.addEventListener("click", closeConfirmationModal);

function dobValidation(minAge, dob) {
  const today = new Date();
  console.log("today", today.toISOString());
  const birthdate = new Date(dob);
  console.log("birthdate", birthdate.getFullYear());
  /* 
  If year difference is > or < minAge return false
  If difference = minAge 
  - check month 
  - check date 
  */
}

dobValidation(15, "1960-01-01");

function validate(e) {
  e.preventDefault();
  /* Retrieve input fields */
  let firstname = document.getElementById("first");
  let lastname = document.getElementById("last");
  let email = document.getElementById("email");
  let birthdate = document.getElementById("birthdate");
  let quantity = document.getElementById("quantity");

  /* retrieve each field value */
  let firstnameValue = firstname.value.trim();
  let lastnameValue = lastname.value.trim();
  let emailValue = email.value.trim();
  let birthdateValue = birthdate.value;
  let quantityValue = quantity.value.trim();
  /* let location = document.getElementById("location").value; */

  let errorMessage = "";

  /* Firstname validation: min caracteres = 2 */
  /* console.log("field input",input.firstname) */

  if (firstnameValue.length < 3) {
    errorMessage = "Veuillez entrer 2 caractères ou plus pour le champ Prénom";
    displayError(firstname, errorMessage);
  } else {
    removeError(firstname);
  }

  /* Lastname validation min caracteres = 2 */
  if (lastnameValue.length < 3) {
    errorMessage = "Veuillez entrer 2 caractères ou plus pour le champ Nom";
    displayError(lastname, errorMessage);
  } else {
    removeError(lastname);
  }

  /* Email validation  */
  let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  errorMessage = "Veuillez entrer une adressse email valide";
  if (emailValue.match(emailReg)) {
    removeError(email);
  } else {
    displayError(email, errorMessage);
  }

  /* Date validation */
  let dateReg = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/; // format dd/mm/yyyy
  /* /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
  /\d{4}$(\-)(((0)[0-9])|((1)[0-2]))(\-)([0-2][0-9]|(3)[0-1])/ */
  // TODO! Date validation: check if age at least 18 years old ??
  if (birthdateValue != "") {
    console.log("date: ", birthdateValue);
    removeError(birthdate);
  } else {
    errorMessage = "Veuillez entrer une date valide";
    displayError(birthdate, errorMessage);
  }

  /*  Number of participation(s): from 0 to 99 */
  const numReg = /^([0-9]{1,2})$/;
  errorMessage = "Veuillez entrer une valeur entre 0 et 99";
  console.log("ff", quantityValue.match(numReg));
  if (quantityValue.match(numReg)) {
    removeError(quantity);
  } else {
    displayError(quantity, errorMessage);
  }

  /* location: check if a location has been selected */
  let location = document.getElementsByName("location");
  console.log("location: ", location);
  let locationValue = "";
  // Check for each location if one has been checked
  for (let i = 0; i < location.length; i++) {
    if (location[i].checked) {
      locationValue = location[i].value;
    }
  }

  if (locationValue === "") {
    errorMessage = "Veuillez sélectionner une ville";
    displayError(location[0], errorMessage);
  } else {
    removeError(location[0]);
  }

  /*  Use conditions checkbox */
  if (checkbox1.checked === false) {
    /* alert('Not OK'); */
    errorMessage = "Veuillez accepter les conditions";
    displayError(checkbox1, errorMessage);
  } else {
    removeError(checkbox1);
  }

  /*  Get info about next events */
  if (checkbox2.checked === true) {
    console.log("event info: ", checkbox2.value);
  }

  const formError = document.querySelectorAll(".formData[data-error]");
  console.log("Nbre error", formError.length);
  if (formError.length > 0) {
    return false;
  } else {
    modalbg.style.display = "none";
    modalConfirmation.style.display = "flex";

    /* 
    formRegistration.onsubmit = function(event) {
      console.log("event1", event);
      alert("Form submited");
      event.preventDefault();
      console.log("event2", event);
      displayConfirmation();
    }
 */

    /* 
    formRegistration.addEventListener(
      "onsubmit", function (e) {
        e.preventDefault();
        console.log("prevent", e)
        displayConfirmation();

      } );
     */
  }
}

// Form error handling processes
// ===========================================
//
function displayError(inputField, errorMessage) {
  // highlight field border in red and display error message
  // Retrieve input field's parent class (formData)
  console.log("input", inputField);
  const formControl = inputField.parentElement;
  // insert attributes to field's parent class
  formControl.dataset.error = errorMessage;
  formControl.dataset.errorVisible = "true";
}

function removeError(inputField) {
  // Remove error attributes from input field's parent class
  const formControl = inputField.parentElement;
  // delete attributes
  delete formControl.dataset.error;
  delete formControl.dataset.errorVisible;
}
