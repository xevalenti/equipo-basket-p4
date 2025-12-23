import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent {

  // Lista de videos (debe coincidir con los nombres en assets/videos)
  videos = [
    { id: 1, title: 'Dalen Terry Highlights', fileName: 'dalenTerry.mp4', thumb: 'assets/fotos/players/dalen.png' },
    { id: 2, title: 'Ayo Dosunmu Top Plays', fileName: 'Ayo_Dosunmu.mp4', thumb: 'assets/fotos/players/ayo.png' },
    { id: 3, title: 'Jalen Smith Defense', fileName: 'jalenSmith.mp4', thumb: 'assets/fotos/players/jalen.png' },
    { id: 4, title: 'Julian Phillips Dunks', fileName: 'julianPhillips.mp4', thumb: 'assets/fotos/players/julian.png' },
    { id: 5, title: 'Noa Essengue Prospect', fileName: 'noaEssengue.mp4', thumb: 'assets/fotos/players/noa.png' },
    { id: 6, title: 'Tre Jones Assists', fileName: 'treJones.mp4', thumb: 'assets/fotos/players/tre.png' },
    { id: 7, title: 'Coby White 3-Pointers', fileName: 'Coby_White.mp4', thumb: 'assets/fotos/players/coby.png' }
  ];

  constructor(private router: Router) {}

  verVideo(fileName: string) {
    // Navegamos al reproductor pasando el nombre del archivo
    this.router.navigate(['/media-player'], {
      state: { videoUrl: fileName }
    });
  }

  irAInicio() {
    this.router.navigate(['/']);
  }
}
