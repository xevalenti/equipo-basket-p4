import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // <--- Importa tus rutas aquí

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';

import { environment } from './environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // <--- Cambia el [] por la variable 'routes'
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging())
  ]
};
