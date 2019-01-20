class Chat {
	constructor (userId, otherId) {
		document.querySelector("#swipe").classList.add("inactive");
		document.querySelector("#signUp").classList.add("inactive");
		document.querySelector("#chat").classList.remove("inactive");
		document.querySelector("#convs").classList.add("inactive");
		document.querySelector("#chatName").textContent = database.findPeopleField(userId,"moniker");

		this.messageListElement = document.getElementById('messages');
		this.messageFormElement = document.getElementById('message-form');
		this.messageInputElement = document.getElementById('message');
		this.submitButtonElement = document.getElementById('submit');
		this.imageButtonElement = document.getElementById('submitImage');
		this.imageFormElement = document.getElementById('image-form');
		this.mediaCaptureElement = document.getElementById('mediaCapture');
		this.userPicElement = document.getElementById('user-pic');
		this.userNameElement = document.getElementById('user-name');
		this.signInButtonElement = document.getElementById('sign-in');
		this.signOutButtonElement = document.getElementById('sign-out');
		this.signInSnackbarElement = document.getElementById('must-signin-snackbar');
		//var database = firebase.database();

		// Saves message on form submit.
		this.messageFormElement.addEventListener('submit', this.onMessageFormSubmit);
		this.signOutButtonElement.addEventListener('click', this.signOut);
		this.signInButtonElement.addEventListener('click', this.signIn);

		// Toggle for the button.
		this.messageInputElement.addEventListener('keyup', this.toggleButton);
		this.messageInputElement.addEventListener('change', this.toggleButton);

		// Events for image upload.
		this.imageButtonElement.addEventListener('click', function(e) {
		  e.preventDefault();
		  this.mediaCaptureElement.click();
		});
		this.mediaCaptureElement.addEventListener('change', this.onMediaFileSelected);

		// initialize Firebase
		this.initFirebaseAuth();

		// Remove the warning about timstamps change. 
		var this.firestore = firebase.this.firestore();
		var this.settings = {timestampsInSnapshots: true};
		this.firestore.this.settings(this.settings);

		// We load currently existing chat messages and listen to new ones.
		this.loadMessages();


		this.loadMessages = this.loadMessages.bind(this);
		this.initFirebaseAuth = this.initFirebaseAuth.bind(this);
		this.authStateObserver = this.authStateObserver.bind(this);
		this.requestNotificationsPermissions = this.requestNotificationsPermissions.bind(this);
		this.userId = userId;
		this.otherId = otherId;
	}
// Signs-in Friendly Chat.
	async signIn() {
	  let email = 'marco@angeli.com';
	  let password = '123456';

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
	    console.log(userId);
	  }
	}

	// Signs-out of Friendly Chat.
	signOut() {
	  // Sign out of Firebase.
	  firebase.auth().signOut();
	}

	// // Initiate firebase auth.
	initFirebaseAuth() {
	  // Listen to auth state changes.
	  firebase.auth().onAuthStateChanged(this.authStateObserver);
	}

	// Returns the signed-in user's profile Pic URL.
	setProfilePicUrl() {
	  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
	}

	// Returns the signed-in user's display name.
	getUserName() {
	  return firebase.auth().currentUser.displayName;
	}

	// Returns true if a user is signed-in.
	isUserSignedIn() {
	  return !!firebase.auth().currentUser;
	}
	// Saves a new message on the Cloud this.firestore.
	saveMessage(messageText) {
	  // Add a new message entry to the Firebase database.
	  return firebase.this.firestore().collection('messages').add({
	    from: firebase.auth().currentUser.uid,
	    to: otherid,
	    text: messageText,
	    timestamp: firebase.this.firestore.FieldValue.serverTimestamp()
	  }).catch(function(error) {
	    console.error('Error writing new message to Firebase Database', error);
	  });
	}

	// Loads chat messages history and listens for upcoming ones.
	loadMessages() {
	  // Create the query to load the last 12 messages and listen for new ones.
	  
	  firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.
	    //var userId = firebase.auth().currentUser.uid;
	    var query = firebase.this.firestore().collection('messages').where("from", "==", this.userId).where("to", "==", this.otherId).orderBy('timestamp', 'desc').limit(12);
	    var query2 = firebase.this.firestore().collection('messages').where("from", "==", this.otherId).where("to", "==", this.userId).orderBy('timestamp', 'desc').limit(12);
	  return firebase.database().ref('/users/' + this.otherId).once('value').then(function(snapshot) {
	    var name = snapshot.val().name;
	    // Start listening to the query.
	    console.log(name);
	    query.onSnapshot(function(snapshot) {
	    snapshot.docChanges().forEach(function(change) {
	    if (change.type === 'removed') {
	        this.deleteMessage(change.doc.id);
	    } else {
	      var message = change.doc.data();
	      return firebase.database().ref('/users/' + message.from).once('value').then(function(snapshot) {
	        var name = snapshot.val().name;
	        this.displayMessage(change.doc.id, message.timestamp, name, message.text);
	      }.bind(this))
	      }
	    }.bind(this));
	  }.bind(this));
	    query2.onSnapshot(function(snapshot) {
	    snapshot.docChanges().forEach(function(change) {
	    if (change.type === 'removed') {
	        this.deleteMessage(change.doc.id);
	    } else {
	      var message = change.doc.data();
	      return firebase.database().ref('/users/' + message.from).once('value').then(function(snapshot) {
	        var name = snapshot.val().name;
	        this.displayMessage(change.doc.id, message.timestamp, name, message.text);
	      }.bind(this))
	      }
	    }.bind(this));
	  }.bind(this));
	  }.bind(this));
	  } else {
	    // No user is signed in.
	  }
	  }.bind(this));
	}

	// Saves a new message containing an image in Firebase.
	// This first saves the image in Firebase storage.
	saveImageMessage(file) {
		// A loading image URL.
		var LOADING_IMAGE_URL = 'https:\/\/www.google.com/images/spin-32.gif?a';
	  // 1 - We add a message with a loading icon that will get updated with the shared image.
	  firebase.this.firestore().collection('messages').add({
	    name: getUserName(),
	    imageUrl: LOADING_IMAGE_URL,
	    profilePicUrl: getProfilePicUrl(),
	    timestamp: firebase.this.firestore.FieldValue.serverTimestamp()
	  }).then(function(messageRef) {
	    // 2 - Upload the image to Cloud Storage.
	    var filePath = firebase.auth().currentUser.uid + '/' + messageRef.id + '/' + file.name;
	    return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
	      // 3 - Generate a public URL for the file.
	      return fileSnapshot.ref.getDownloadURL().then((url) => {
	        // 4 - Update the chat message placeholder with the image’s URL.
	        return messageRef.update({
	          imageUrl: url,
	          storageUri: fileSnapshot.metadata.fullPath
	        });
	      });
	    });
	  }).catch(function(error) {
	    console.error('There was an error uploading a file to Cloud Storage:', error);
	  });
	}

	// Saves the messaging device token to the datastore.
	saveMessagingDeviceToken() {
	  firebase.messaging().getToken().then(function(currentToken) {
	    if (currentToken) {
	      console.log('Got FCM device token:', currentToken);
	      // Saving the Device Token to the datastore.
	      firebase.this.firestore().collection('fcmTokens').doc(currentToken)
	          .set({uid: firebase.auth().currentUser.uid});
	    } else {
	      // Need to request permissions to show notifications.
	      requestNotificationsPermissions();
	    }
	  }).catch(function(error){
	    console.error('Unable to get messaging token.', error);
	  });
	}

	// Requests permissions to show notifications.
	requestNotificationsPermissions() {
	  console.log('Requesting notifications permission...');
	  firebase.messaging().requestPermission().then(function() {
	    // Notification permission granted.
	    this.saveMessagingDeviceToken();
	  }).catch(function(error) {
	    console.error('Unable to get permission to notify.', error);
	  }.bind(this));
	}

	// Triggered when a file is selected via the media picker.
	onMediaFileSelected(event) {
	  event.preventDefault();
	  var file = event.target.files[0];

	  // Clear the selection in the file picker input.
	  this.imageFormElement.reset();

	  // Check if the file is an image.
	  if (!file.type.match('image.*')) {
	    var data = {
	      message: 'You can only share images',
	      timeout: 2000
	    };
	    this.signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
	    return;
	  }
	  // Check if the user is signed-in
	  if (checkSignedInWithMessage()) {
	    saveImageMessage(file);
	  }
	}

	// Triggered when the send new message form is submitted.
	onMessageFormSubmit(e) {
	  e.preventDefault();
	  // Check that the user entered a message and is signed in.
	  if (this.messageInputElement.value && checkSignedInWithMessage()) {
	    saveMessage(this.messageInputElement.value).then(function() {
	      // Clear message text field and re-enable the SEND button.
	      resetMaterialTextfield(this.messageInputElement);
	      toggleButton();
	    });
	  }
	}

	// Triggers when the auth state change for instance when the user signs-in or signs-out.
	authStateObserver(user) {
	  if (user) { // User is signed in!
	    // Get the signed-in user's profile pic and name.
	    // var profilePicUrl = getProfilePicUrl();
	    var userName = this.getUserName();

	    // Set the user's profile pic and name.
	    // this.userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
	    this.userNameElement.textContent = userName;

	    // Show user's profile and sign-out button.
	    this.userNameElement.removeAttribute('hidden');
	    this.userPicElement.removeAttribute('hidden');
	    this.signOutButtonElement.removeAttribute('hidden');

	    // Hide sign-in button.
	    this.signInButtonElement.setAttribute('hidden', 'true');

	    // We save the Firebase Messaging Device token and enable notifications.
	    saveMessagingDeviceToken();
	  } else { // User is signed out!
	    // Hide user's profile and sign-out button.
	    this.userNameElement.setAttribute('hidden', 'true');
	    this.userPicElement.setAttribute('hidden', 'true');
	    this.signOutButtonElement.setAttribute('hidden', 'true');

	    // Show sign-in button.
	    this.signInButtonElement.removeAttribute('hidden');
	  }
	}

	// Returns true if user is signed-in. Otherwise false and displays a message.
	checkSignedInWithMessage() {
	  // Return true if the user is signed in Firebase
	  if (isUserSignedIn()) {
	    return true;
	  }

	  // Display a message to the user using a Toast.
	  var data = {
	    message: 'You must sign-in first',
	    timeout: 2000
	  };
	  this.signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
	  return false;
	}

	// Resets the given MaterialTextField.
	resetMaterialTextfield(element) {
	  element.value = '';
	  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
	}

	// Template for messages.
	

	// Adds a size to Google Profile pics URLs.
	addSizeToGoogleProfilePic(url) {
	  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
	    return url + '?sz=150';
	  }
	  return url;
	}

	

	// Delete a Message from the UI.
	deleteMessage(id) {
	  var div = document.getElementById(id);
	  // If an element for that message exists we delete it.
	  if (div) {
	    div.parentNode.removeChild(div);
	  }
	}

	// Displays a Message in the UI.
	displayMessage(id, timestamp, name, text) {
		var MESSAGE_TEMPLATE =
	    '<div class="message-container">' +
	      '<div class="spacing"><div class="pic"></div></div>' +
	      '<div class="message"></div>' +
	      '<div class="name"></div>' +
	    '</div>';
	  console.log(text);
	  var div = document.getElementById(id);
	  // If an element for that message does not exists yet we create it.
	  if (!div) {
	    var container = document.createElement('div');
	    container.innerHTML = MESSAGE_TEMPLATE;
	    div = container.firstChild;
	    div.setAttribute('id', id);
	    div.setAttribute('timestamp', timestamp);
	    for (var i = 0; i < this.messageListElement.children.length; i++) {
	      var child = this.messageListElement.children[i];
	      var time = child.getAttribute('timestamp');
	      if (time && time > timestamp) {
	        break;
	      }
	    }
	    this.messageListElement.insertBefore(div, child);
	  }
	  div.querySelector('.name').textContent = name;
	  var messageElement = div.querySelector('.message');
	  if (text) { // If the message is text.
	    messageElement.textContent = text;
	    // Replace all line breaks by <br>.
	    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
	  } 
	  // Show the card fading-in and scroll to view the new message.
	  setTimeout(function() {div.classList.add('visible')}, 1);
	  this.messageListElement.scrollTop = this.messageListElement.scrollHeight;
	  this.messageInputElement.focus();
	}

	// Enables or disables the submit button depending on the values of the input
	// fields.
	toggleButton() {
	  if (this.messageInputElement.value) {
	    this.submitButtonElement.removeAttribute('disabled');
	  } else {
	    this.submitButtonElement.setAttribute('disabled', 'true');
	  }
	}

	// Checks that the Firebase SDK has been correctly setup and configured.
	checkSetup() {
	  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
	    window.alert('You have not configured and imported the Firebase SDK. ' +
	        'Make sure you go through the codelab setup instructions and make ' +
	        'sure you are running the codelab using `firebase serve`');
	  }
	}

	initSetup() {

		// Shortcuts to DOM Elements.
		

		
	}
}