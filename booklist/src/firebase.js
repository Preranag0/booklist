// src/firebase.js

import { getStorage } from 'firebase/storage';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkcvPC2CdROqBEMEr8D0X0Bmj02Zt9C8k",
  authDomain: "boooklist-c2bbf.firebaseapp.com",
  databaseURL: "https://boooklist-c2bbf-default-rtdb.firebaseio.com/",
  projectId: "boooklist-c2bbf",
  storageBucket: "boooklist-c2bbf.appspot.com",
  messagingSenderId: "912232919072",
  appId: "1:912232919072:web:fbb8586de2824ec9a5cc45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app)

export { db ,storage};


