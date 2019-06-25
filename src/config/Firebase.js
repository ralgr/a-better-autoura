import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var config = {
  apiKey: "AIzaSyBG5fI5yNyIHx5eDRcxmeWDmLz_8wcD_Bc",
  authDomain: "autoura-san-b3e30.firebaseapp.com",
  databaseURL: "https://autoura-san-b3e30.firebaseio.com",
  projectId: "autoura-san-b3e30",
  storageBucket: "autoura-san-b3e30.appspot.com",
  messagingSenderId: "83092347134",
  appId: "1:83092347134:web:5f71a04acea7a570"
  };

export const fb = firebase.initializeApp(config);
export const db = firebase.firestore(); //Database export.

// Enable offline persistence
db.enablePersistence({experimentalTabSynchronization:true});
