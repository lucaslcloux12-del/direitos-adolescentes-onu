// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBG6MQQjwdXVEslNILJsfc5VG_pVLYpOKc",
  authDomain: "brasil-ong.firebaseapp.com",
  databaseURL: "https://brasil-ong-default-rtdb.firebaseio.com",
  projectId: "brasil-ong",
  storageBucket: "brasil-ong.firebasestorage.app",
  messagingSenderId: "424544972501",
  appId: "1:424544972501:web:46855cd65db716b73f3c5c",
  measurementId: "G-WG7JPW00MH"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

console.log("%cFirebase carregado com sucesso!", "color:#009edb");
