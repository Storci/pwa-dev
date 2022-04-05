import * as fb from "./Global/Firebase/firebase_auth_module.js";
import * as tw from "./Global/Thingworx/thingworx_api_module.js";

// definisce l'url di base della pagina attuale (in questo caso della pagina index.html).
// il risultato è http(s)://xxx.xxx.xxx.xxx:xxxx
// baseURL verrà utilizzato come base per il cambio pagina.
let baseURL = window.location.protocol + "//" + window.location.host;
let pageURL = window.location.href

// Recupera il nome dell'utente da firebase, controlla che sia loggato.
// Nel caso non fosse loggato richiama la pagina di login
//fb.onAuthStateChanged_2(baseURL, pageURL)

let user = {'email': 'simone.zardi@storci.com'}

let global_customer

tw.getUser(user.email)
.then(customerRow => {
	global_customer = customerRow.rows[0].Customer
	// Definizione globale del customer a cui l'utente è associato.
	localStorage.setItem('global_customer', global_customer)
	// salvo il customer selezionato
	localStorage.setItem('global_selected_customer', global_customer)

  // Controllo nel caso l'utente faccia parte della Storci.
  // Se è un utente storci viene reindirizzato alla pagina /Storci/selectCustomer.html.
  // Se non è un utente storci viene reindirizzato alla pagina /Customer/Customer_Info.html.
  if(global_customer.includes("Storci")){
  	// Carica la pagina.
  	window.location.href = baseURL + "/01_Customers.html";
  }else{
  	// Carica la pagina.
  	window.location.href = baseURL + "/02_Dashboard.html";
  }
})
.catch(error => console.error(error))
