// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnW40wLcc-nFvbFtp1NDTXXZh6x1hl9j4",
  authDomain: "christmas-wheel-6c48c.firebaseapp.com",
  projectId: "christmas-wheel-6c48c",
  storageBucket: "christmas-wheel-6c48c.firebasestorage.app",
  messagingSenderId: "694074872587",
  appId: "1:694074872587:web:c6a5016d4549007257880e",
  measurementId: "G-1YZ8RQZKL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);