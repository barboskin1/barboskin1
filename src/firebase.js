import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtGr2-dfiI77hfzxo3BuIL33WSvizMl-g",
  authDomain: "barboskin-chat.firebaseapp.com",
  databaseURL: "https://barboskin-chat-default-rtdb.firebaseio.com",
  projectId: "barboskin-chat",
  storageBucket: "barboskin-chat.firebasestorage.app",
  messagingSenderId: "950814541030",
  appId: "1:950814541030:web:46ba397381e1eef37d6727",
  measurementId: "G-XM1289W8KG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };