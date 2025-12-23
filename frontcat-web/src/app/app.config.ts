import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // <--- Importa tus rutas aquí

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideDatabase, getDatabase } from '@angular/fire/database';

const firebaseConfig = {
  apiKey: "AIzaSyBUUF5jhHNx2TON-UsgyZ0LyssrWHC2gaw",
  authDomain: "equipo-basket-p2.firebaseapp.com",
  databaseURL: "https://equipo-basket-p2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "equipo-basket-p2",
  storageBucket: "equipo-basket-p2.appspot.com",
  messagingSenderId: "474074122785",
  appId: "1:474074122785:web:a3440b09aa77b492a2f160",
  measurementId: "G-0T52MVSGHZ"
};
import { environment } from './environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // <--- Cambia el [] por la variable 'routes'
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideDatabase(() => getDatabase())
  ]
};
