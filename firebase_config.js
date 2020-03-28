const firebase = require('firebase');
require('dotenv').config();

const {API_KEY, APP_ID, MESS_SENDER_ID, FIREBASE_DB_URL} = process.env;


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "wedding-320e9.firebaseapp.com",
    databaseURL: FIREBASE_DB_URL,
    projectId: "wedding-320e9",
    storageBucket: "wedding-320e9.appspot.com",
    messagingSenderId: MESS_SENDER_ID,
    appId: APP_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();

  module.exports = db;