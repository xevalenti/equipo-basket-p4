import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';

@Injectable({ providedIn: 'root' })
export class PushService {
  constructor(private messaging: Messaging) {}

  async requestPermission() {
    try {
      const token = await getToken(this.messaging, {
        vapidKey: 'TU_VAPID_KEY'
      });
      console.log('Token FCM:', token);
      return token;
    } catch (err) {
      console.error('No se pudo obtener el token', err);
      return null;
    }
  }

  listenForeground() {
    return onMessage(this.messaging, (payload) => {
      console.log('Mensaje en foreground:', payload);
    });
  }
}
