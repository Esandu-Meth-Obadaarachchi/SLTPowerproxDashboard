// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyBNk5vE7oTpBqliRLiguYuVyyvjNC_9z6A",
  authDomain: "powerprox-fb129.firebaseapp.com",
  databaseURL: "https://powerprox-fb129-default-rtdb.firebaseio.com",
  projectId: "powerprox-fb129",
  storageBucket: "powerprox-fb129.firebasestorage.app",
  messagingSenderId: "70824165947",
  appId: "1:70824165947:web:f9f932226ea76de26d121e",
  measurementId: "G-PYEKTGXT2C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messaging = getMessaging(app);

export async function registerFCMTokenWithUserDetails() {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BO0sB5bwjmuj8Rpl4TROoOyPTEFPNqKHu_F9_4VVyWmDFAQIBdqzkIIaFAwGxbpsdzQs7cZuQdPFBMnXJoQYQYo",
    });

    if (!token) {
      console.warn("⚠️ No FCM token. Check permissions.");
      return;
    }

    console.log("🟢 FCM Token:", token);  // <-- Log the token here!

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Send only token and user_id to match FastAPI model
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

export function listenToForegroundMessages(callback) {
  return onMessage(messaging, callback);
}

export { app, auth, messaging };
