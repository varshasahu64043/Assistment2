// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA6b5nLwInDUS0ZqqoJ7A5UY4XL3gBOw2k",
    authDomain: "app-8ecbc.firebaseapp.com",
    projectId: "app-8ecbc",
    storageBucket: "app-8ecbc.appspot.com", // ✅ FIXED
    messagingSenderId: "1018175176922",
    appId: "1:1018175176922:web:94abb084b7ab2311f865e3",
    databaseURL: "https://app-8ecbc-default-rtdb.firebaseio.com",
    measurementId: "G-L8WR38T89T"
};

export const app = initializeApp(firebaseConfig);
