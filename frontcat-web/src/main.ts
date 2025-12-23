import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then(() => console.log('SW registrado'))
    .catch(err => console.error('Error registrando SW', err));
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
