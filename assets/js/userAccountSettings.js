import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"

// Recupera il nome dell'utente da firebase, controlla che sia loggato.
// Nel caso non fosse loggato richiama la pagina di login
fb.onAuthStateChanged_2()

// la funzione per selezionare le pagine nel menù verticale della pagina della impostazione
/*$('.account-settings-links a').click(function(){
    $(this).tab('show');
})

$('.account-settings-links a[href="#account-change-password"]').tab('show')*/