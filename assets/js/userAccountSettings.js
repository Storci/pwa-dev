import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import * as lang from "./Global/Common/Translation.js"

fb.onAuthStateChanged_2()
lang.getLanguage()

$('#passwordUpdate').click(function(){
    var newPassword = $('#newPassword').val();
    var user = firebase.auth().currentUser;
    //var password = $('#oldPassword').val();
    console.log(user)
    
    const createCredential = user => {
        const password = $('#oldPassword').val();
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            password
        );
        return credential;
    }

    const credential = createCredential(user)
    /*const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    );*/
    console.log(credential)
    changePassword(user, credential, newPassword);
});


function changePassword(user, credential, newPassword){
	user.reauthenticateWithCredential(credential).then(() => {
            // User re-authenticated.
            console.log(newPassword)
            user.updatePassword(newPassword).then(() => {
                console.log("ok")
            
                    $("#successAlert").fadeIn(3000);
                
            
            });
	}).catch((error) => {
		    $("#errorAlert").fadeIn(3000);
	  });
}

// funzione per mostrare i dettagli dell'utente nei vari campi di input




/*function recoverUserDetail(){
    firebase.auth().onAuthStateChanged((user) => {
        //console.log(user)

        //display the displayName and photoURL of the user on the page
        if(user !== null)
            firstname.innerText = user.firstname;
        if(user.displayLastname)
            lastname.innerText = user.lastname;

        if(user.displayEmail)
        email.innerText = user.email;

        if(user.displayCompany)
            company.innerText = user.company;

        if(user.displayTelephone)
            telephone.innerText = user.telephone;

        if(user.displayCountry)
            country.innerText = user.country;    
    })

}
*/
//fb.getUserData()

const auth = firebase.auth()
console.log(auth)