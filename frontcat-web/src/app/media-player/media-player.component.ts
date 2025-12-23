import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  videoUrl: string | null = null;
  finalSrc: string | null = null;

  constructor(private router: Router) {
    // Recuperamos la URL pasada por el estado de navegación
    const navigation = this.router.getCurrentNavigation();
    this.videoUrl = navigation?.extras.state?.['videoUrl'] || null;
  }

  ngOnInit() {
    if (this.videoUrl) {
      // Si el videoUrl es solo un nombre (ej: "dalenTerry.mp4"),
      // asumimos que está en la carpeta assets/videos/
      if (!this.videoUrl.startsWith('http') && !this.videoUrl.startsWith('data:')) {
        this.finalSrc = `assets/videos/${this.videoUrl}`;
      } else {
        this.finalSrc = this.videoUrl;
      }
    }
  }

  playVideo() {
    this.videoPlayer.nativeElement.play();
  }

  pauseVideo() {
    this.videoPlayer.nativeElement.pause();
  }

  stopVideo() {
    this.videoPlayer.nativeElement.pause();
    this.videoPlayer.nativeElement.currentTime = 0;
  }

  irAInicio() {
    this.router.navigate(['/']);
  }
}
