import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from '../app/environment';

@Injectable({
    providedIn: 'root'
})
export class MessagingService {
    private messaging = getMessaging();

    constructor() { }

    requestPermission() {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                this.getToken();
            } else {
                console.log('Permiso denegado');
            }
        });
    }

    private getToken() {
        getToken(this.messaging, { vapidKey: environment.vapidKey })
            .then(token => console.log('Token FCM:', token))
            .catch(err => console.error('Error obteniendo token:', err));
    }

    receiveMessages() {
        onMessage(this.messaging, payload => {
            console.log('Mensaje recibido:', payload);
            alert(`Notificación: ${payload.notification?.title}`);
        });
    }
}
