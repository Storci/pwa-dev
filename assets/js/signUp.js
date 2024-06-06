// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"

import * as common from "./Global/Common/commonFunctions.js"

let baseURL = window.location.protocol + "//" + window.location.host

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
/*$('#IDButtonSignUp').click(function(){
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
              $("#signUpSuccess").css("display","block")
              /*setTimeout(() => {
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
})*/


$('#IDButtonSignUp').click(async function(e) {
  e.preventDefault(); // Prevent default form submission behavior

  try {
      let email = $('#IDEmail').val();
      let customerCode = $('#Unique').val();

      let tableRow = await tw.getUser(email);

      if (tableRow.rows.length > 0) {
          $('#IDErrorMessageSignUp').css("display", "block");
          $('#IDErrorMessageSignUp').text('Error, the email is already in use');
      } else {
          let pass1 = $('#IDPassword').val();
          let pass2 = $('#IDPassword_repeat').val();

          if (pass1 === pass2) {
              await tw.service_97_addNewUser(email, customerCode);
              await fb.signUpWithEmailPassword(email, pass1);

              let db = firebase.firestore();
              let data = db.collection('users').doc(email);

              await data.set({
                  firstName: $("#IDName").val(),
                  lastName: $("#IDLastName").val(),
                  email: $("#IDEmail").val(),
                  company: $("#IDCompanyName").val(),
                  state: $("#IDCountries").val(),
                  mobile: $("#IDPhoneNumber").val(),
              });

              $("#signUpSuccess").css("display", "block");
              console.log("sign up succesful")
          } else {
              $('#IDErrorMessage').css("display", "block");
              $('#IDErrorMessage').text('Error, the two passwords do not match');
          }
      }
  } catch (error) {
      console.error(error);
      $('#IDErrorMessage').css("display", "block");
      $('#IDErrorMessage').text(error.message); // Display error message to user
  }
});


// URL per chiamata REST API per ottenere la lista dei paesi
const url = "https://restcountries.com/v2/all";

// la funzione che ottiene la lista dei paesi and aggiornare il dropdown
async function fetchCountries() {
    try {
        // fare una richiesta get utilizzando la parola API FETCH
        const response = await fetch(url);
        
        // Check if the response is OK (status code 200-299) controllare se la risposta ricevuta è OK 200
        if (!response.ok) {
            throw new Error('risposto è andata a buon fine ' + response.statusText);
        }
        
        // fare un parse alla risposta ricevuto in un JSON
        const countries = await response.json();

        // attraverso il for genero l'elemento option in base alla lunghezza
        let results = '<option value="-1">Please Select a Country or State</option>';
        for (let i = 0; i < countries.length; i++) {
            results += `<option>${countries[i].name}</option>`;
        }

        // Update the select element with the new options aggiorna l'elemento selezionato con  le nuove opzioni 
        document.getElementById("IDCountries").innerHTML = results;
        
        // un console log per visualizzare i paesi
        console.log(countries);
    } catch (error) {
        // un exception in caso di un errore
        console.error('operazione in errore:', error);
    }
}

// Call the function to fetch and display the countries
fetchCountries();




/*$('#IDButtonSignUp').click(async function() {
  try {
      let email = $('#IDEmail').val();
      let customerCode = $('#Unique').val();

      let tableRow = await tw.getUser(email);

      if (tableRow.rows.length > 0) {
          $('#IDErrorMessageSignUp').css("display", "block");
          $('#IDErrorMessageSignUp').text('Error, the email is already in use');
      } else {
          let pass1 = $('#IDPassword').val();
          let pass2 = $('#IDPassword_repeat').val();

          if (pass1 === pass2) {
              await Promise.all([
                  tw.service_97_addNewUser(email, customerCode),
                  fb.signUpWithEmailPassword(email, pass1)
              ]);

              let db = firebase.firestore();
              let data = db.collection('users').doc(email);

              await data.set({
                  firstName: $("#IDName").val(),
                  lastName: $("#IDLastName").val(),
                  email: $("#IDEmail").val(),
                  company: $("#IDCompanyName").val(),
                  state: $("#IDCountries").val(),
                  mobile: $("#IDPhoneNumber").val(),
              });

              $("#signUpSuccess").css("display", "block");
          } else {
              $('#IDErrorMessage').css("display", "block");
              $('#IDErrorMessage').text('Error, the two passwords do not match');
          }
      }
  } catch (error) {
      console.error(error);
      $('#IDErrorMessage').css("display", "block");
      $('#IDErrorMessage').text(error.message); // Display error message to user
  }
});
*/