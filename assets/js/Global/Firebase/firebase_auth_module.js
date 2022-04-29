// These samples are intended for Web so this import would normally be
// done in HTML however using modules here is more convenient for
// ensuring sample correctness offline.
//import firebase from "firebase/app";
//import "firebase/auth";

// Effettua il login di utente già registrato
async function signInWithEmailPassword(email, password) {
	return new Promise(function(resolve, reject){
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(user   => resolve(user))
		.catch(error => reject(error))
	})
}

// Effettua la registrazione di un nuovo utente
function signUpWithEmailPassword(email, password, baseURL) {
	// [START auth_signup_password]
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then((userCredential)  => {
            let db = firebase.firestore();
            db.collection('users').doc(userCredential.user.email).set({
            firstName : signUpForm['IDName'].value,
            lastName : signUpForm['IDLastName'].value,
            phoneNumber : signUpForm['IDPhoneNumber'].value,
            Countries : signUpForm['IDCountries'].value
        });
	}).then(() =>{
        let user = userCredential.user
		window.location.href = baseURL + 'signUpConfirmed.html'
    })
	.catch((error) => {
		let errorCode = error.code
		let errorMessage = error.message

		$('#IDErrorMessage').css("display", "block")
		$('#IDErrorMessage').text('code: ' + errorCode + ' - ' + errorMessage)
	})
}

function sendEmailVerification() {
	// [START auth_send_email_verification]
	firebase.auth().currentUser.sendEmailVerification()
	.then(() => {
		// Email verification sent!
		// ...
	});
	// [END auth_send_email_verification]
}

function sendPasswordReset() {
	const email = "sam@example.com";
	// [START auth_send_password_reset]
	firebase.auth().sendPasswordResetEmail(email)
	.then(() => {
		// Password reset email sent!
		// ..
	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		// ..
	});
	// [END auth_send_password_reset]
}

function signOut(){
	// [START signOut]
	firebase.auth().signOut().then(() => {
		// Sign-out successful.
		console.info("Utente disconnesso");
			///window.location.href = './90_signIn.html'
	}).catch((error) => {
		// An error happened.
		console.error(error);
	});
	// [END signOut]
}


async function onAuthStateChanged(){
	return new Promise(function(resolve, reject){
		firebase.auth().onAuthStateChanged(user => resolve(user))
	})
}


function onAuthStateChanged_2(){
	firebase.auth().onAuthStateChanged((user) => {
  	if(!user){
			let pageURL = window.location.href
			localStorage.setItem('urlPage', pageURL)
			window.location.href = './90_signIn.html'
		}
		localStorage.setItem('user', user)
	})
}

function setPersistenceSession() {
  var email = "...";
  var password = "...";

  // [START auth_set_persistence_session]
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      //return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  // [END auth_set_persistence_session]
}

function setPersistenceNone() {
  // [START auth_set_persistence_none]
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
    .then(() => {
      var provider = new firebase.auth.GoogleAuthProvider();
      // In memory persistence will be applied to the signed in Google user
      // even though the persistence was set to 'none' and a page redirect
      // occurred.
      return firebase.auth().signInWithRedirect(provider);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  // [END auth_set_persistence_none]
}

function userUpdatePassword(){
	firebase.auth().updatePassword(user, newPassword).then(() => {
		// Update successful.
	  }).catch((error) => {
		// An error ocurred
		// ...
	  });
}

function userReauthentification(){
	firebase.auth().reauthenticateWithCredential(user, credential).then(() => {
		// User re-authenticated.
	  }).catch((error) => {
		// An error ocurred
		// ...
	  });
}

export {signInWithEmailPassword, signUpWithEmailPassword, sendEmailVerification, sendPasswordReset, signOut, onAuthStateChanged, setPersistenceSession, setPersistenceNone, onAuthStateChanged_2, userUpdatePassword, userReauthentification};
