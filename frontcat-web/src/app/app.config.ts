import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';

import { environment } from './environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging())
  ]
};
