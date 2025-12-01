// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from "axios";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVgwsp_4POOuOZLE9SlkJwRbz1uQz6e0o",
  authDomain: "powerprox-71a21.firebaseapp.com",
  databaseURL: "https://powerprox-71a21-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "powerprox-71a21",
  storageBucket: "powerprox-71a21.appspot.com",
  messagingSenderId: "431010192284",
  appId: "1:431010192284:web:798523a2e38bae74dd8659",
  // measurementId: "your-measurement-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messaging = getMessaging(app);

// Function to register FCM token with backend
export async function registerFCMTokenWithUserDetails() {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BO0sB5bwjmuj8Rpl4TROoOyPTEFPNqKHu_F9_4VVyWmDFAQIBdqzkIIaFAwGxbpsdzQs7cZuQdPFBMnXJoQYQYo",
    });
    
    if (!token) {
      console.warn("⚠️ No FCM token. Check permissions.");
      return;
    }
    
    console.log("🟢 FCM Token:", token);
    
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Send token and user_id to backend
        await axios.post("http://localhost:8000/register_token/", {
          token: token,
          user_id: user.uid,
        });
        console.log("✅ Token registered with backend.");
      }
    });
  } catch (err) {
    console.error("❌ Failed to register FCM token:", err);
  }
}

// Function to listen to foreground messages
export function listenToForegroundMessages(callback) {
  return onMessage(messaging, callback);
}

export { app, auth, messaging };