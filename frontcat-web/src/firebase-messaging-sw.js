importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDrh_oNIWORCQJ9lwdUqxaiQEqeNOIpfpY",
  authDomain: "equipo-basket-p4.firebaseapp.com",
  projectId: "equipo-basket-p4",
  storageBucket: "equipo-basket-p4.firebasestorage.app",
  messagingSenderId: "637478469272",
  appId: "1:637478469272:web:7115e5773458e944a4daed",
  measurementId: "G-JDMMWTEF6L"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/assets/icons/icon-192x192.png'
  });
});
