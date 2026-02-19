// public/firebase-messaging-sw.js

// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyBNk5vE7oTpBqliRLiguYuVyyvjNC_9z6A",
  authDomain: "powerprox-fb129.firebaseapp.com",
  projectId: "powerprox-fb129",
  messagingSenderId: "70824165947",
  appId: "1:70824165947:web:f9f932226ea76de26d121e"
});

// Get messaging instance
const messaging = firebase.messaging();

// Optional: Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log('📦 Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: '/firebase-logo.png' // Optional: Add your custom icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
