import 'firebase/auth';
import 'firebase/firestore'; // Add other Firebase services as needed
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/database";
import firebase from 'firebase/compat/app';


const firebaseConfig = {
    apiKey: "AIzaSyA-SsTQgBCXZtQfnXVmoPV0k7jXhp3UK1o",
    authDomain: "project-619600056093.firebaseapp.com",
    projectId: "project-619600056093",
    storageBucket: "project-619600056093.appspot.com",
    messagingSenderId: "619600056093",
    appId: "619600056093",
   
};


// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore(); // Add other Firebase services as needed

export { firebase, auth, firestore };