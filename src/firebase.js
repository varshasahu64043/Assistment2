// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    databaseURL: process.env.DATABASEURL,
    measurementId: process.env.MEASUREMENTID
};

export const app = initializeApp(firebaseConfig);
