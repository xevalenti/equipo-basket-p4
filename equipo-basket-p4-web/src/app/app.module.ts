/*import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';


import { environment } from './enviroment';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    // Inicializar Firebase correctamente
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // Firestore
    provideFirestore(() => getFirestore()),

    // Messaging
    provideMessaging(() => getMessaging())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
*/
