import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-root',
  template: `<h1>Mi App Angular con Firebase Messaging</h1>`
})
export class AppComponent implements OnInit {

  constructor(
    private messagingService: MessagingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // ✔ Solo ejecutar en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.messagingService.requestPermission();
      this.messagingService.receiveMessages();
    }
  }
}
