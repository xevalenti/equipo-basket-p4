import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(
    private messaging: Messaging,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  requestPermission() {

    if (!isPlatformBrowser(this.platformId)) return;

    if (!('Notification' in window)) {
      console.log('Este navegador no soporta notificaciones');
      return;
    }

    Notification.requestPermission().then(async permission => {
      if (permission === 'granted') {
        this.getDeviceToken();
      } else {
        console.log('Permiso denegado');
      }
    });
  }

  private async getDeviceToken() {

  if (!isPlatformBrowser(this.platformId)) return;

  try {
    // Esperar a que el Service Worker esté listo
    const registration = await navigator.serviceWorker.ready;

    const token = await getToken(this.messaging, {
      vapidKey: environment.vapidKey,
      serviceWorkerRegistration: registration   
    });

    console.log('Token FCM:', token);

  } catch (err) {
    console.error('Error obteniendo token:', err);
  }
}


  receiveMessages() {

    if (!isPlatformBrowser(this.platformId)) return;

    // ✔ Evitar error cuando el SW aún no está listo
    if (!navigator?.serviceWorker) {
      console.warn('Service Worker no disponible todavía');
      return;
    }

    // ✔ Evitar error cuando el SW está registrado pero no controlando la página
    if (!navigator.serviceWorker.controller) {
      console.warn('Service Worker aún no controla la página');
      return;
    }

    onMessage(this.messaging, payload => {
      console.log('Mensaje recibido en foreground:', payload);
      alert(`Notificación: ${payload.notification?.title}`);
    });
  }
}
