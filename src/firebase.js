// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtGr2-dfiI77hfzxo3BuIL33WSvizMl-g",
  authDomain: "barboskin-chat.firebaseapp.com",
  databaseURL: "https://barboskin-chat-default-rtdb.firebaseio.com",
  projectId: "barboskin-chat",
  storageBucket: "barboskin-chat.appspot.com",
  messagingSenderId: "950814541030",
  appId: "1:950814541030:web:46ba397381e1eef37d6727",
  measurementId: "G-XM1289W8KG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function signIn() {
  return signInWithPopup(auth, provider);
}

function signOutUser() {
  return signOut(auth);
}

function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export { db, auth, signIn, signOutUser, onAuthChange };
