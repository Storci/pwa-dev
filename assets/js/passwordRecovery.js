import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import Cookies from './Global/Cookie/api.js'

// definisce l'url di base della pagina attuale (in questo caso della pagina index.html).
// il risultato è http(s)://xxx.xxx.xxx.xxx:xxxx
// baseURL verrà utilizzato come base per il cambio pagina.
let baseURL = window.location.protocol + "//" + window.location.host

$("#IDErrorMessage").hide()
 //var auth = firebase.auth();
// funzione per il recupero della password
/*$("#IDButtonResetPassword").click(function(){
   
    let email = $("#IDEmail").val();
    console.log(email)
    
    // controllo sul campo input se non è vuoto prima di inviare il link per cambia password
    if(email != ""){
       firebase.auth().sendPasswordResetEmail(email)
       .then(() =>{
           alert("please check your email account a link has been sent");
       })
        .catch((error) => {
           alert("insert a correct email address")
       })
    } else{
        window.alert("Please write your email first");
    }
    
    
})*/

let mailField = document.querySelector("#IDEmail");
let resetButton = document.querySelector("#IDButtonResetPassword");

let auth = firebase.auth()

const resetPasswordFunction = () =>{
    let email = mailField.value
    if(email != ""){
        auth.sendPasswordResetEmail(email)
        .then(() =>{
            alert("email was sent successfully")
        })
        .catch(error =>{
            conosle.error(error)
        })
    }else{
        alert("This input cannot be empty")
    }
    
}
resetButton.addEventListener('click', resetPasswordFunction)


