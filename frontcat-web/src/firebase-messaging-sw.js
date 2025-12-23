importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBUUF5jhHNx2TON-UsgyZ0LyssrWHC2gaw",
  authDomain: "equipo-basket-4.firebaseapp.com",
  projectId: "equipo-basket-4",
  storageBucket: "equipo-basket-4.appspot.com",
  messagingSenderId: "474074122785",
  appId: "1:474074122785:web:a3440b09aa77b492a2f160"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/assets/icons/icon-192x192.png'
  });
});
