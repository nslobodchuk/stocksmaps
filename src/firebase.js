// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd8_qPan_r3Fo43cOlf7Z3qyE0fXzFiiE",
  authDomain: "stocksmaps-6b6b2.firebaseapp.com",
  projectId: "stocksmaps-6b6b2",
  storageBucket: "stocksmaps-6b6b2.appspot.com",
  messagingSenderId: "286115839125",
  appId: "1:286115839125:web:205ec229443b1a9ab1ef9c",
  measurementId: "G-31YL3J510Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);