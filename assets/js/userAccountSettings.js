//import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"

// Recupera il nome dell'utente da firebase, controlla che sia loggato.
// Nel caso non fosse loggato richiama la pagina di login
fb.onAuthStateChanged_2()

// funzione per cambiare la password nella pagina di impostazione del profilo

// dichiarazione delle variabbile  
const userCurrentPassword = document.getElementById("currentPassword")
const userNewPassword = document.getElementById("newPassword")
const userConfirmPassword= document.getElementById("confirmPassword")
const btnUpdate= document.getElementById('passwordUpdate')
console.log()
let auth = firebase.auth().currentUser
const user = auth

btnUpdate.addEventListener('click', () =>{
    
   updatePassword(user, userNewPassword).then(() => {
        console.log("password changed")
      }).catch((error) => {
       console.error(error)
      });
      alert("hello")
})
