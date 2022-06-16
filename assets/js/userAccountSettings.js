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
//console.log(fb.getUserData())
/*function getdata(){
    const mail = document.getElementById('display_email')

    firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {

        let dbUser = firebase.firestore();
        dbUser.collection('users').get().then((snapshot) =>{
            snapshot.docs.forEach(doc =>{
                console.log(doc.data())
            })
         })
         

        // The user object has basic properties such as display name, email, etc.
        const firstName = user.firstName;
        mail.innerHTML = user.email;
        console.log(mail)
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getIdToken() instead.
        const uid = user.uid;
    }
})

}*/

//getdata();

function getData(){
  //  var user = firebase.auth()
    var db = firebase.firestore()
    var docRef = db.collection("users").doc('richard.sarpong@storci.com');

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    })
    .catch((error) => {
        console.log("Error getting document:", error);
    });
}

getData()