import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import * as lang from "./Global/Common/Translation.js"

fb.onAuthStateChanged_2()

lang.getLanguage()

$('#passwordUpdate').click(function(){
    var newPassword = $('#newPassword').val();
    var user = firebase.auth().currentUser;
    console.log(user)
    
  const createCredential = user => {
    const password = prompt('Password:');
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    );
    return credential;
}

const credential = createCredential(user)
    console.log(credential)
    fb.changePassword(user, credential, newPassword);
});
