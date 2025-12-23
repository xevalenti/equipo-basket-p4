import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {
  player: any = null;
  headshotSrc: string | null = null;

  constructor(private router: Router) {
    // Recuperar el objeto jugador pasado por navegación
    const navigation = this.router.getCurrentNavigation();
    this.player = navigation?.extras.state?.['player'] || null;
  }

  ngOnInit() {
    if (this.player) {
      this.headshotSrc = this.getHeadshotSource();
    }
  }

  getHeadshotSource(): string | null {
    const p = this.player;
    if (!p) return null;

    // Prioridad 1: Base64 guardado directamente
    if (p.headshotBase64) {
      // Si ya tiene el prefijo "data:image" lo dejamos, si no, se lo ponemos
      return p.headshotBase64.startsWith('data:')
             ? p.headshotBase64
             : `data:image/jpeg;base64,${p.headshotBase64}`;
    }

    // Prioridad 2: URL de imagen o path de assets
    if (p.headshot && typeof p.headshot === 'string') {
      return p.headshot;
    }

    return null;
  }

  verVideo() {
    this.router.navigate(['/media-player'], {
      state: { videoUrl: this.player.video }
    });
  }

  irAInicio() {
    this.router.navigate(['/inicio']);
  }
}
