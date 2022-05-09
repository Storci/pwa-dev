import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import * as lang from "./Global/Common/Translation.js"

// Recupera il nome dell'utente da firebase, controlla che sia loggato.
// Nel caso non fosse loggato richiama la pagina di login
fb.onAuthStateChanged_2()


// funzione per cambiare la password nella pagina di impostazione del profilo

// dichiarazione delle variabbile  
//const userCurrentPassword = document.getElementById("currentPassword")
//const newPassword = document.getElementById("newPassword")
//const userConfirmPassword= document.getElementById("confirmPassword")
//const btnUpdate= document.getElementById('passwordUpdate')


console.log()
lang.getLanguage()
console.log(lang.getLanguage())


/*const user = firebase.auth();
console.log(user)
const newPassword = getASecureRandomPassword();
function passwordChange(){

  /*user.UpdatePassword(newPassword).then(() => {
    console.log("password changed")
  }).catch((error) => {
   console.error(error)
  });
  alert("hello")*/

$('#passwordUpdate').click(function(){
    var newPassword = $('#newPassword').val();
    var user = firebase.auth().currentUser;
    console.log(user)
    //var oldPassword = $('#oldPassword').val();
    var credential= firebase.auth.EmailAuthProvider.credential(user.email, userProvidedPassword)
   /* const createCredential = user => {
      const password = $('#oldPassword').val();
      const credential = firebase.auth.EmailAuthProvider.credential(user.email,password);
      return credential;
  }*/


    console.log(user)
    

    fb.changePassword(user, credential, newPassword);
    

});
/*btnUpdate.addEventListener('click', () =>{
    
   UpdatePassword(user, newPassword).then(() => {
        console.log("password changed")
      }).catch((error) => {
       console.error(error)
      });
      alert("hello")
})*/

/*const updatePasswordFunction = () =>{
fb.userUpdatePassword(user, userNewPassword)
  .then(() => {
    console.log("password changed")
  }).catch((error) => {
   console.error(error)
  });
  alert("hello")

}*/
//btnUpdate.addEventListener('click', passwordChange)