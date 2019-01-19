
    /**
     * Handles the sign in button press.
     */

    async function handleSignIn() {
      let email = document.getElementById('sign-in-email').value;
      let password = document.getElementById('sign-in-password').value;

      let success = true;

      await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        success = false;
        
        alert(errorMessage);
        console.log(error);
        // [END_EXCLUDE]
      });
      
      if (success) {
        let userId = firebase.auth().currentUser.uid;
        let app = new App(userId);  
      }

      
    }


    
    async function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;

      var name = document.getElementById('name').value;

      var course1 = document.getElementById('course1').value;
      var course2 = document.getElementById('course2').value;
      var course3 = document.getElementById('course3').value;
      var course4 = document.getElementById('course4').value;
      var course5 = document.getElementById('course5').value;

      var hobby1 = document.getElementById('hobby1').value;
      var hobby2 = document.getElementById('hobby2').value;
      var hobby3 = document.getElementById('hobby3').value;

      var enviroment = document.getElementById('enviroment').value;

      var database = firebase.database();


      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }

      let success = true;

      // Sign in with email and pass.
      // [START createwithemail]
      await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    

      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('users/' + userId).set({name: name, courses: [course1, course2, course3, course4, course5], hobbies: [hobby1, hobby2, hobby3], enviroment: enviroment});
      let app = new App(userId);
    }
    
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        // [END_EXCLUDE]
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [END_EXCLUDE]
        }
      });
      // [END authstatelistener]
      document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);

      document.getElementById('quickstart-login').addEventListener('click', handleSignIn, false);
    }
    window.onload = function() {
      initApp();
    };