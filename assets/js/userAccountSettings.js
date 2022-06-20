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

/*function getData(){
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
}*/

//getData()
/*function getData(email, password){
   
    
          firebase.auth().createUserWithEmailAndPassword(email,password)
          .then((userCredential)=>{
            const db =  firebase.firestore()
          
            db.collection('users').doc()
            .set({
              fullName: userData.get('fullName'),
              pictures: userData.get('pictures'),
              phoneNumber: userData.get('phoneNumber')
            });
          })
         
      };*/

//getData('richard.sarpong@storci.com', 'password')
// dichiarazione dei variabile per i campi di input
let firstname = document.getElementById('display_name')
let lastname = document.getElementById('display_lastname')
let email = document.getElementById('display_email')
let company = document.getElementById('display_company')
let telephone = document.getElementById('display_telephone')
let country  = document.getElementById('display_country')

// funzione per recuperare i dati dell'utente da firestore quando si logga
 function getData(){
    firebase.auth().onAuthStateChanged(function (user) {
    
        // Lay connection with the database.
        //var firestore = firebase.firestore();
        var db = firebase.firestore()

        var docRef = db.collection('users').doc(user.email);
    
        // Get the user data from the database.
        docRef.get()
        .then(function (doc) {
            // Catch error if exists. 
                //console.log(doc.data(user.email.Countries))

           firstname.value = doc.get('firstName')
           console.log(firstname)
           lastname.value = doc.get('lastName')
           email.value = doc.get('mail')
           company.value = doc.get('companyName')
           telephone.value = doc.get('phoneNumber')
           country.value = doc.get('Countries')
           console.log(company)
           
        });
    });
 }

 getData()



 
 // funzionw per aggiornare l'informazione dell'utente
 /*function updateUserInfo(){
    firebase.auth().onAuthStateChanged(function(user){
        var db = firebase.firestore()
        var passwordDb= db.collection('users').doc(user)
    })
    .then((doc) =>{
     passwordDb.collection('users').doc(userData)
        .update({
            firstname : doc['display_name'].value,
            lastname : doc['display_lastname'].value,
            email : doc['mail'].value,
            company : doc['display_company'].value,
            telephone : doc['display_telephone'].value,
            country : doc['display_country'].value,
            
        })
    })
	
    }*/

    function updateUserInfo(){
        const userDocRef =  firebase.firestore()
    .collection('users')
    .doc(firebase.auth().onAuthStateChanged.email)


    userDocRef.update({
        firstName:editProfile["display_name"].value,
        lastName:editProfile["display_lastname"].value,
        mail:editProfile["display_email"].value,
        companyName:editProfile["display_company"].value,
        phoneNumber:editProfile["display_telephone"].value,
        Countries:editProfile["display_country"].value

    })
    }

let btnUpdate = document.getElementById('profile_Update')

btnUpdate.addEventListener('click', updateUserInfo)