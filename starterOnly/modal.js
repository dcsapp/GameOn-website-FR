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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal without update
function closeModal() {
  modalbg.style.display = none;
}

/* 
const form = document.getElementById('reserve');
form.addEventListener('submit', e => {
  e.preventDefault();
  validate();
}) */

function validate() {
  /* var emailReg = /^([w-.]+@([w-]+.)+[w-]{2,4})?$/; */
  var firstname = document.getElementById("first").value;
  var lastname = document.getElementById("last").value;
  var email = document.getElementById("email").value;
  var birthdate = document.getElementById("birthdate").value;
  var quantity = document.getElementById("quantity").value;
  var location = document.getElementById("location").value;

  if (firstname.length > 2) {
    /* alert(firstname); */
    /*  this.data-error-visible : true; */
    /*  data-error-visible="true" */
    /* text-control.value = 'toto'; */
    /*   ::after */
  } else {
    /* firstname.classListAdd('formData[data-error]::after')

   firstname.classListAdd('formData[data-error-visible="true"]::after');
   firstname.classListAdd('text-control'); */

    var toto = this.label;
    alert('toto');
    /* 
   alert('Error must be more than 2 caracters'); */
  }
}
