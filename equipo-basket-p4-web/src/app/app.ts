import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('equipo-basket-p4-web');

  constructor(private messagingService: MessagingService) {}

  ngOnInit(): void {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessages();
  }
}
