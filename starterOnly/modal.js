function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// R E S P O N S I V E  L I S T E N E R
if (window.innerWidth <= 768) {
  editNav();
}

// U P D A T E  A C T I V E  N A V  L I N K S
/* const navLinks = document.querySelectorAll(".main-navbar a");
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    this.classList.add("active");
  });
}); */

// D O M  E L E M E N T S
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
// ------------------------------------------------------------
const modalContent = document.querySelector(".modal-body");
const modalConfirmation = document.querySelector(".formConfirmation");
const formInput = document.querySelectorAll("input");

// B U T T O N S
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal without updating
// 1-Select close button
const closeModalBtn = document.querySelectorAll(".close");
// 2-Add an eventListener to each button/.close to trigger function closeModal()
closeModalBtn.forEach(function (btn) {
  btn.addEventListener("click", closeModal);
});

function closeModal() {
  this.parentElement.parentElement.style.display = "none";
}
// Button handling
function closeConfirmationModal() {
  modalConfirmation.style.display = "none";
}
// Confirmation modal
const btnCloseConfirmation = document.querySelector(".btn-closeConfirmation");
btnCloseConfirmation.addEventListener("click", closeConfirmationModal);

// F O R M  S U B M I S S I O N
// Prevent form submission
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// Regex used in validation form fields
const regName =
  /^([a-zA-Zçêëöéè]{2,20})(([\s|\-]{1})([a-zA-Zçêëöéè]{2,20})?)?$/i;
// Accept composed firstname with - in between and multiple name with at at least 2 caracters and max 20
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regDate = /^\d{4}-[01][0-9]-[0123][0-9]$/;
const regNum = /^([0-9]{1,2})$/;

// Date validation
function dobValidation(minAge, dob) {
  // Get form submission date - today (ms)
  const today = Date.now();
  // Transform birthdate (dob) from the form in ms
  const birthdate = new Date(dob).getTime();
  // Get current Age
  const currentAge = new Date(today - birthdate).getFullYear() - 1970;
  if (currentAge >= minAge && currentAge <= 100) {
    return true;
  } else {
    return false;
  }
}

function validate() {
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
  /* if (firstnameValue.length < 3) { */
  if (!regName.test(firstnameValue)) {
    errorMessage = "Veuillez entrer 2 caractères ou plus pour le champ Prénom";
    displayError(firstname, errorMessage);
  } else {
    removeError(firstname);
  }

  /* Lastname validation min caracteres = 2 / Max 20 */
  errorMessage = "Veuillez entrer 2 caractères ou plus pour le champ Nom";
  if (!regName.test(lastnameValue)) {
    displayError(lastname, errorMessage);
  } else {
    removeError(lastname);
  }

  /* Email validation  */
  errorMessage = "Veuillez entrer une adressse email valide";
  if (!regEmail.test(emailValue)) {
    displayError(email, errorMessage);
  } else {
    removeError(email);
  }

  /* Date validation */
  // 1 - Check if date format is correct -> regDate
  // 2 - Once format is correct check if age is >= 15 and under 100
  const minAge = 15;
  if (!regDate.test(birthdateValue)) {
    errorMessage = "Veuillez entrer une date valide";
    displayError(birthdate, errorMessage);
  } else if (dobValidation(minAge, birthdateValue)) {
    removeError(birthdate);
  } else {
    errorMessage =
      "Vous devez avoir au moins " +
      minAge +
      " ans et moins de 100 ans pour vous inscrire";
    displayError(birthdate, errorMessage);
  }

  /*  Number of participation(s): from 0 to 99 */
  errorMessage = "Veuillez entrer une valeur entre 0 et 99";
  if (!regNum.test(quantityValue)) {
    displayError(quantity, errorMessage);
  } else {
    removeError(quantity);
  }

  /* location: check if a location has been selected */
  let location = document.getElementsByName("location");
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
  if (!checkbox2.checked) {
    checkbox2.checked = false;
  } else {
    checkbox2.checked = true;
  }

  // Check if any error remains  /  If not, form is validated
  const formError = document.querySelectorAll(".formData[data-error]");
  if (formError.length > 0) {
    return false;
  } else {
    modalbg.style.display = "none";
    modalConfirmation.style.display = "flex";
  }
}

// F O R M  E R R O R  H A N D L I N G  D I S P L A Y
function displayError(inputField, errorMessage) {
  // highlight field border in red and display error message
  // Retrieve input field's parent class (formData)
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
