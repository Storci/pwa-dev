// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"

import * as common from "./Global/Common/commonFunctions.js"

//let baseURL = window.location.protocol + "//" + window.location.host

// Nasconde il messaggio di errore nel momento in cui digito qualcosa di diverso nei vari campi
$('.form-control').on('input', function(){
  $('#IDErrorMessage').css("display", "none")
})

$("#IDEmail").keyup(function(){
  let email = $(this).val()
  // Criteri di controllo per il campo new password
  // Criteri di controllo per il campo old password
  switch(true){
    case email == "": $("#IDEmail").addClass("is-invalid").removeClass("is-valid"); break;
    case !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/): $("#IDEmail").addClass("is-invalid").removeClass("is-valid"); break;
    default: $("#IDEmail").addClass("is-valid").removeClass("is-invalid"); break;
  }
})
$("#IDEmail_repeat").keyup(function(){
  let email_confirm = $(this).val()
  let email = $("#IDEmail").val()
  // Criteri di controllo per il campo new password
  // Criteri di controllo per il campo old password
  switch(true){
    case email_confirm == "": $("#IDEmail_repeat").addClass("is-invalid").removeClass("is-valid"); break;
    case email_confirm != email : $("#IDEmail_repeat").addClass("is-invalid").removeClass("is-valid"); break;
    default: $("#IDEmail_repeat").addClass("is-valid").removeClass("is-invalid"); break;
  }
})
$("#IDPassword").keyup(function(){
  let newPassword = $(this).val()
  let status_new_Password = $(this).val()
  // Criteri di controllo per il campo new password
  switch(true){
    case newPassword == "": $("#invalid-mess-11").text("Please, insert your new password."); $("#IDPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case newPassword.length < 8: $("#invalid-mess-11").text("Attention, password must be long of 8 characters"); $("#IDPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case newPassword.length > 20: $("#invalid-mess-11").text("Attention, password must be short of 20 characters"); $("#IDPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case !newPassword.match(/[a-z]+/): $("#invalid-mess-11").text("Attention, password must be contain at least a low character"); $("#IDPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case !newPassword.match(/[0-9]+/): $("#invalid-mess-11").text("Attention, password must be contain at least a number"); $("#IDPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case !newPassword.match(/[A-Z]+/): $("#invalid-mess-11").text("Attention, password must be contain at least a up character"); $("#IDPassword").addClass("is-invalid").removeClass("is-valid"); break;
    default: $("#IDPassword").addClass("is-valid").removeClass("is-invalid"); status_new_Password = true; break;
  }
})
$("#IDPassword_repeat").keyup(function(){
  let newPassword = $("#IDPassword").val()
  let confirmPassword = $(this).val()
  // Criteri di controllo per il campo new password
  // Criteri di controllo per il campo confirm password
  switch(true){
    case confirmPassword == "": $("#invalid-mess-12").text("Please, confirm your new password."); $("#IDPassword_repeat").addClass("is-invalid").removeClass("is-valid"); break;
    case confirmPassword !== newPassword: $("#invalid-mess-12").text("Attention, the passwords not match"); $("#IDPassword_repeat").addClass("is-invalid").removeClass("is-valid"); break;
    default: $("#IDPassword_repeat").addClass("is-valid").removeClass("is-invalid"); status_confirm_Password = true; break;
  }
})


// Funzione scatenata dalla pressione del pulsante di sign up
$('#IDButtonSignUp').click(function(){
  let email = $('#IDEmail').val()
  let customerCode = $('#Unique').val()

  // Controlla che l'email non sia già stata usata
  // Recupera il record dell'utente dalla tabella di tw
	tw.getUser(email)
		.then(tableRow => {
      if(tableRow.rows.length > 0){
        $('#IDErrorMessageSignUp').css("display", "block")
        $('#IDErrorMessageSignUp').text('Error, the email is already use')
      }else{
        let pass1 = $('#IDPassword').val()
        let pass2 = $('#IDPassword_repeat').val()
        if(pass1 == pass2){
          
          tw.service_97_addNewUser(email, customerCode)
          fb.signUpWithEmailPassword(email, pass1) //baseURL)

          let db = firebase.firestore()
          let data = db.collection('users').doc(email)

          data.set({
            firstName:$("#IDName").val(),
            lastName: $("#IDLastName").val(),
            email:    $("#IDEmail").val(),
            company:  $("#IDCompanyName").val(),
            state:    $("#IDCountries").val(),
            mobile:   $("#IDPhoneNumber").val(),
          })
          .then(() => {
              $("#signUpSuccess").fadeIn(1500)
              setTimeout(() => {
                window.location.href = "./90_signIn.html"
              }, 3000);
          })
          .catch((error) => {
            console.log(error)
            $('#IDErrorMessage').css("display", "block")
            $('#IDErrorMessage').text(error)
          })
        }else{
          $('#IDErrorMessage').css("display", "block")
          $('#IDErrorMessage').text('Error, the 2 passwords are different')
        }
      }
    })
		.catch(error => console.error(error))
})


// una chiamata rest per recuperare tutta la lista delle nazione
var url = "https://restcountries.com/v2/all"
// Imposta i settings da utilizzare nelle REST API.
// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
let settings = {
    "url"     : url,
    "method"  : "GET",
    "timeout" : 0,
    "headers" : {},
    "data": "",
    "success": function(country){
        let results = '<option value="-1">Please Select a Country or State</option>'
        for(let i = 0; i < country.length; i++){
            results += '<option>'+ country[i].name +'</option>'
        }
        $("#IDCountries").html(results)
    }
}
// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
// Esegue la chiamata REST API.
$.ajax(settings).then(response => console.log(response));

 









/** Codicie Javascript */
/*
document.querySelectorAll('.form-control').forEach(function(el) {
  el.addEventListener('input', function() {
    document.querySelector('#IDErrorMessage').style.display = 'none';
  });
});

document.querySelector('#IDEmail').addEventListener('keyup', function() {
  let email = this.value;

  switch (true) {
    case email === '':
      this.classList.add('is-invalid');
      this.classList.remove('is-valid');
      break;
    case !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/):
      this.classList.add('is-invalid');
      this.classList.remove('is-valid');
      break;
    default:
      this.classList.add('is-valid');
      this.classList.remove('is-invalid');
      break;
  }
});

document.querySelector('#IDEmail_repeat').addEventListener('keyup', function() {
  let emailConfirm = this.value;
  let email = document.querySelector('#IDEmail').value;

  switch (true) {
    case emailConfirm === '':
      this.classList.add('is-invalid');
      this.classList.remove('is-valid');
      break;
    case emailConfirm !== email:
      this.classList.add('is-invalid');
      this.classList.remove('is-valid');
      break;
    default:
      this.classList.add('is-valid');
      this.classList.remove('is-invalid');
      break;
  }
});

document.querySelector('#IDPassword').addEventListener('keyup', function() {
  var status_new_Password = false;
var newPassword

switch(true) {
  case newPassword == "":
    document.querySelector("#invalid-mess-11").textContent = "Please, insert your new password.";
    document.querySelector("#IDPassword").classList.add("is-invalid");
    document.querySelector("#IDPassword").classList.remove("is-valid");
    break;
  case newPassword.length < 8:
    document.querySelector("#invalid-mess-11").textContent = "Attention, password must be long of 8 characters";
    document.querySelector("#IDPassword").classList.add("is-invalid");
    document.querySelector("#IDPassword").classList.remove("is-valid");
    break;
  case newPassword.length > 20:
    document.querySelector("#invalid-mess-11").textContent = "Attention, password must be short of 20 characters";
    document.querySelector("#IDPassword").classList.add("is-invalid");
    document.querySelector("#IDPassword").classList.remove("is-valid");
    break;
  case !newPassword.match(/[a-z]+/):
    document.querySelector("#invalid-mess-11").textContent = "Attention, password must be contain at least a low character";
    document.querySelector("#IDPassword").classList.add("is-invalid");
    document.querySelector("#IDPassword").classList.remove("is-valid");
    break;
  case !newPassword.match(/[0-9]+/):
    document.querySelector("#invalid-mess-11").textContent = "Attention, password must be contain at least a number";
    document.querySelector("#IDPassword").classList.add("is-invalid");
    document.querySelector("#IDPassword").classList.remove("is-valid");
    break;
  case !newPassword.match(/[A-Z]+/):
    document.querySelector("#invalid-mess-11").textContent = "Attention, password must be contain at least a up character";
    document.querySelector("#IDPassword").classList.add("is-invalid");
    document.querySelector("#IDPassword").classList.remove("is-valid");
    break;
  default:
    document.querySelector("#IDPassword").classList.add("is-valid");
    document.querySelector("#IDPassword").classList.remove("is-invalid");
    status_new_Password = true;
    break;
}
});*/

/*document.querySelector("#IDPassword_repeat").addEventListener("keyup", function() {
  let newPassword = document.querySelector("#IDPassword").value;
  let confirmPassword = this.value;
  let invalidMess12 = document.querySelector("#invalid-mess-12");

  switch (true) {
    case confirmPassword == "":
      invalidMess12.textContent = "Please, confirm your new password.";
      this.classList.add("is-invalid");
      this.classList.remove("is-valid");
      break;
    case confirmPassword !== newPassword:
      invalidMess12.textContent = "Attention, the passwords not match";
      this.classList.add("is-invalid");
      this.classList.remove("is-valid");
      break;
    default:
      this.classList.add("is-valid");
      this.classList.remove("is-invalid");
      statusConfirmPassword = true;
      break;
  }
});*/


/**Codice javascript */
/*document.getElementById("IDButtonSignUp").addEventListener("click", function(){
  let email = document.getElementById("IDEmail").value;
  let customerCode = document.getElementById("Unique").value;
  
  tw.getUser(email)
  .then(tableRow => {
  if(tableRow.rows.length > 0){
  document.getElementById("IDErrorMessageSignUp").style.display = "block";
  document.getElementById("IDErrorMessageSignUp").innerText = 'Error, the email is already use';
  } else {
  let pass1 = document.getElementById("IDPassword").value;
  let pass2 = document.getElementById("IDPassword_repeat").value;
  if(pass1 == pass2){
        tw.service_97_addNewUser(email, customerCode);
        fb.signUpWithEmailPassword(email, pass1);
  
        let db = firebase.firestore();
        let data = db.collection('users').doc(email);
  
        data.set({
          firstName: document.getElementById("IDName").value,
          lastName: document.getElementById("IDLastName").value,
          email: document.getElementById("IDEmail").value,
          company: document.getElementById("IDCompanyName").value,
          state: document.getElementById("IDCountries").value,
          mobile: document.getElementById("IDPhoneNumber").value,
        })
        .then(() => {
            document.getElementById("signUpSuccess").style.display = "block";
            setTimeout(() => {
              window.location.href = "./90_signIn.html";
            }, 3000);
        })
        .catch((error) => {
          console.log(error);
          document.getElementById("IDErrorMessage").style.display = "block";
          document.getElementById("IDErrorMessage").innerText = error;
        });
      } else {
        document.getElementById("IDErrorMessage").style.display = "block";
        document.getElementById("IDErrorMessage").innerText = 'Error, the 2 passwords are different';
      }
    }
  })
  .catch(error => console.error(error));
  });

var url = "https://restcountries.com/v2/all";
var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.timeout = 0;
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function() {
if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
var country = JSON.parse(xhr.responseText);
let results = '<option value="-1">Please Select a Country or State</option>';
for(let i = 0; i < country.length; i++){
results += '<option>'+ country[i].name +'</option>';
}
document.getElementById("IDCountries").innerHTML = results;
}
};
xhr.send();*/
