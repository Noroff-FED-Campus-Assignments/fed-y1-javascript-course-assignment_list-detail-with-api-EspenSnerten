const form = document.getElementById("form");
const fName = document.getElementById("fname");
const lName = document.getElementById("lname");
const email = document.getElementById("email");
const phoneNr = document.getElementById("phonenumber");
const address = document.getElementById("address");
const textBox = document.getElementById("textbox");
const submit= document.getElementById("submit");

form.addEventListener("submit", (e) => {

  validateForm(); 
  console.log(isFormValid());
  if(isFormValid()==true){
    form.submit();
  } else{
  e.preventDefault();
  }
});

function isFormValid(){
  const inputContainers = form.querySelectorAll('.form_box');
  let result = true;
  inputContainers.forEach((container)=>{
      if(container.classList.contains('error')){
          result = false;
      }
  });
  return result;
}

function validateForm() {
  const fNameValue = fName.value.trim();
  const lNameValue = lName.value.trim();
  const emailValue = email.value.trim();
  const phoneNrValue = phoneNr.value.trim();
  const addressValue = address.value.trim();
  const textboxValue = textBox.value.trim();

  if (fNameValue === "") {
    setErrorFor(fName, "Please enter your first name");
  } else {
    setSuccessfor(fName);
  }

  if (lNameValue === "") {
    setErrorFor(lName, "Please enter your last name");
  } else {
    setSuccessfor(lName);
  }

  if (emailValue === "") {
    setErrorFor(email, "Email is required");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Must be a valid email address");
  } else {
    setSuccessfor(email);
  }

  if (phoneNrValue === "") {
    setErrorFor(phoneNr, "Phone number is required");
  } else if (!isPhoneNr(phoneNrValue)) {
    setErrorFor(phoneNr, "Can not contain space or letters");
  } else {
    setSuccessfor(phoneNr);
  }

  // this validation length is ridiculous
  if (addressValue.length <= 25) {
    setErrorFor(address, "Please enter your full address");
  } else {
    setSuccessfor(address);
  }

  if (textboxValue.length <= 10) {
    setErrorFor(textBox, "Minimum required characters is 10");
  } else {
    setSuccessfor(textBox);
  }
}

function setErrorFor(input, message) {
  const formBox = input.parentElement;
  const small = formBox.querySelector("small");

  small.innerText = message;
  formBox.className = "form_box error";
}

function setSuccessfor(input) {
  const formBox = input.parentElement;
  formBox.className = "form_box success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function isPhoneNr(phoneNr) {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    phoneNr
  );
}
