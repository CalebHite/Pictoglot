// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI0ng7gTqI2CXV2Nu8XK7FTMjKN0crlig",
  authDomain: "pictoglot.firebaseapp.com",
  projectId: "pictoglot",
  storageBucket: "pictoglot.appspot.com",
  messagingSenderId: "746569222787",
  appId: "1:746569222787:web:ae752d09c43e2617a4a9b6",
  measurementId: "G-T0J39NG55J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);