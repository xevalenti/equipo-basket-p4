import { Component, OnInit } from '@angular/core';
import { MessagingService } from './messaging.service';

@Component({
    selector: 'app-root',
    template: `<h1>Mi App Angular con Firebase Messaging</h1>`
})
export class AppComponent implements OnInit {
    constructor(private messagingService: MessagingService) { }

    ngOnInit() {
        this.messagingService.requestPermission();
        this.messagingService.receiveMessages();
    }
}
