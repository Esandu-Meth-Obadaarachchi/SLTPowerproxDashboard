// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  'apiKey': "AIzaSyCVgwsp_4POOuOZLE9SlkJwRbz1uQz6e0o",
  'authDomain': "powerprox-71a21.firebaseapp.com",
  'databaseURL': "https://powerprox-71a21-default-rtdb.asia-southeast1.firebasedatabase.app", // Update this
  'projectId': "powerprox-71a21",
  'storageBucket': "powerprox-71a21.appspot.com",
  'messagingSenderId': "431010192284",
  'appId': "1:431010192284:web:798523a2e38bae74dd8659",
 // 'measurementId': "your-measurement-id"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };