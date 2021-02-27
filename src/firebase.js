import firebase from 'firebase/app'
import 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyA5H4kacdombe0ZBZyaPYtrVgU2oTAlU5k",
    authDomain: "veterinarycrud.firebaseapp.com",
    projectId: "veterinarycrud",
    storageBucket: "veterinarycrud.appspot.com",
    messagingSenderId: "297609935217",
    appId: "1:297609935217:web:f0095d70e3f27103731ed0"
  };
  
  // Initialize Firebase
  export const firebaseApp = firebase.initializeApp(firebaseConfig);