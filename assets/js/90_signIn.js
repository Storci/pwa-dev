import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"




// Convalida l'inserimento dell'email
$('.user-info').keyup(function(){
	let value = $(this).val()
	let type = $(this).attr("type")

	if(type == "email"){
		// Criteri di controllo per il campo old password
		switch(true){
			case value == "": $(this).addClass("is-invalid").removeClass("is-valid"); break;
			case !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/): $(this).addClass("is-invalid").removeClass("is-valid"); break;
			default: $(this).addClass("is-valid").removeClass("is-invalid"); break;
		}
	}
})

// Convalida l'inserimento della passwors
$('.password-field').keyup(function(){
	$("#field-password").addClass("is-valid").removeClass("is-invalid");
})


// Funzione per mostrare la password in chiaro.
$(".toggle-password").click(function(){
	let id = "#" + $(this).attr("passwordField")
  
	if($(id).attr("type") == "password"){
	  $(this).text("visibility_off")
	  $(id).attr("type", "text")
	}else{
	  $(this).text("visibility")
	  $(id).attr("type", "password")
	}
  })


// Esegue la funzione alla pressione del pulsante.
$("#IDButtonLogin").click(function(){
	//  Nasconde il messaggio di errore.
	$("#IDErrorMessage").addClass('d-none')
	// Recupera il valore inserito nel campo email.
	let email = $("#field-email").val()
	// Recupera il valore inserito nel campo password.
	let password = $("#field-password").val()
	// Effettua il logout dell'utente alla chiusura della sessione (pagina web)
	fb.setPersistenceSession()
	// Definisce l'utente
	let user;
	// Effettua il login dell'utente con l'email e la password
	fb.signInWithEmailPassword(email, password)
		.then(user => {
			tw.getUser(user.user.email)
				.then(customer => {
					// Definizione globale del customer a cui l'utente è associato.
					localStorage.setItem('global_customer', customer.rows[0].Customer)
					// salvo il customer selezionato
					localStorage.setItem('global_selected_customer', customer.rows[0].Customer)

					if(customer.rows[0].Customer.includes("Storci")){
						// Carica la pagina.
						window.location.href = "./01_Customers.html"
					}else{
						// salvo il customer selezionato
						localStorage.setItem('global_entityName', customer.rows[0].entityName)
						// Carica la pagina.
						window.location.href = "./02_Dashboard.html?entityName=" + customer.rows[0].entityName
					}
				})
				.catch(error => console.error(error))
		})
		.catch(error => showError(error))
})


// La funzione mostra l'errore dell'autenticazione
function showError(error){
	// Logga l'errore
	console.error("Err: " + error)
	// Imposta il testo.
	$("#IDErrorMessage").text(error)
	// Mostra il testo dell'errore.
	$("#IDErrorMessage").removeClass('d-none')
}


//funzione per mostrare la password dell' utente
$("#showPassword").click(function(){
	let password = $('#IDPassword')
	if(password.attr('type') == "password"){
		password.attr('type', 'text')
	}else{
		password.attr('type','password')
	}
})


// Initialize i18next
i18next.init({
	lng: 'en', // default language
	resources: {
	  en: {
		translation: {
		  "actual_alarms": "Actual Alarms",
		  "number_of_alarms": "Numbers of Alarms Present"
		}
	  },
	  it: {
		translation:{
		"actual_alarms":"Allarmi Attuale",
		"number_of_alarms":"Numeri Allarmi Presenti"
		}
	  }
	}
	
  });
  
  function translatePage() {
	let select_language = localStorage.getItem("select_language")
	let select_language_complete = localStorage.getItem("select_language_complete")
	$('#dropdown2').text(select_language_complete)
	$('[data-i18n]').each(function() {
	  var key = $(this).data('i18n');
	  try{
		$(this).text(i18next.t(key)[$(this).attr("data-i18n")][select_language]);
	  }catch(e){}
	  
	});
  }

  $(".translate1").click(function() {
	console.log($(this).attr('id'))
	console.log($(this).attr('value'))
	$("#dropdown1").text($(this).attr('value'))
	let select_language = $(this).attr('id')
  // Salva la selezione nella variabile localStorage.
  // la local storage rimane salvata sul client.
  localStorage.setItem('select_language', $(this).attr('id'));
  localStorage.setItem('select_language_complete', $(this).attr('value'));
  // Seleziona tutti gli elementi con l'attributo [translate_id]
  // Effettua, poi, un ciclo per ogni elemento trovato
  $('[data-i18n]').each(function(index, element) {
	//$(this).text(i18next.t(key));
	try{
		$(this).text(i18next.t(key)[$(this).attr("data-i18n")][select_language]);
	  }catch(e){}
	})
})
  
  translatePage();
  
  