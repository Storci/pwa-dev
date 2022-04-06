import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import Cookies from './Global/Cookie/api.js'

// definisce l'url di base della pagina attuale (in questo caso della pagina index.html).
// il risultato è http(s)://xxx.xxx.xxx.xxx:xxxx
// baseURL verrà utilizzato come base per il cambio pagina.
/*
let baseURL = window.location.protocol + "//" + window.location.host
*/
// Nasconde il messaggio di errore.
$("#IDErrorMessage").hide()

// Esegue la funzione alla pressione del pulsante.
$("#IDButtonLogin").click(async function(){
	//  Nasconde il messaggio di errore.
	$("#IDErrorMessage").hide()
	// Recupera il valore inserito nel campo email.
	let email = $("#IDEmail").val()
	// Recupera il valore inserito nel campo password.
	let password = $("#IDPassword").val()
	// Effettua il logout dell'utente alla chiusura della sessione (pagina web)
	fb.setPersistenceSession()
	// Definisce l'utente
	let user;
	// Effettua il login dell'utente con l'email e la password
	await fb.signInWithEmailPassword(email, password)
		.then(result => user = result)
		.catch(error => showError(error))
	// Definisce il record della tabella
	let tableCustomer;
	// Recupera il record dell'utente dalla tabella di tw
	await tw.getUser(user.user.email)
		.then(result => tableCustomer = result)
		.catch(error => console.error(error))
	// Estrapola il nome del customer dalla risposta della chiamata.
	let customer = tableCustomer.rows[0].Customer
	// Definizione globale del customer a cui l'utente è associato.
	localStorage.setItem('global_customer', customer)
	// salvo il customer selezionato
	localStorage.setItem('global_selected_customer', customer)
	// Recupera la localstorage che contiene il percorso della pagina precedente
	let pageURL = localStorage.getItem('urlPage')
	// Se presente, dopo il login, riporta l'utente alla pagina precedente.
	// Se non presente, controlla nel caso l'utente faccia parte della Storci.
	// Se è un utente storci viene reindirizzato alla pagina /Storci/selectCustomer.html.
	// Se non è un utente storci viene reindirizzato alla pagina /Customer/Customer_Info.html.
	if(pageURL){
		// Carica la pagina.
		window.location.href = pageURL
	}else if(customer.includes("Storci")){
		// Carica la pagina.
		window.location.href = "./01_Customers.html"
	}else{
		// Carica la pagina.
		window.location.href = "./02_Dashboard.html"
	}
})


// La funzione mostra l'errore dell'autenticazione
function showError(error){
	// Logga l'errore
	console.error("Err: " + error)
	// Imposta il testo.
	$("#IDErrorMessage").text(error)
	// Mostra il testo dell'errore.
	$("#IDErrorMessage").show()
}


//funzione per mostrare la password dell' utente
$(document).ready(function(){

    $("#showPassword").on('click', function(){
            var password = $('#IDPassword')

            if(password.attr('type') === "password"){
                password.attr('type', 'text')
                console.log(password)
            }else{
                 password.attr('type','password')
            }
        })
 })
