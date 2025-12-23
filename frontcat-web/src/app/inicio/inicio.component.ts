import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  players$: Observable<any[]> | undefined;

  constructor(private firestore: Firestore, private router: Router) {}
getAvatar(player: any): string | null {
  // 1. Si hay base64, lo priorizamos
  if (player.headshotBase64) {
    return 'data:image/jpeg;base64,' + player.headshotBase64;
  }
  // 2. Si no hay base64 pero hay una URL en headshot
  if (player.headshot && player.headshot.startsWith('http')) {
    return player.headshot;
  }
  // 3. Si no hay nada, devolvemos null para que salga el div de iniciales
  return null;
}
  ngOnInit() {
    // 1. Referencia a la colección 'players' en tu nuevo proyecto p2
    const playersCollection = collection(this.firestore, 'players');

    // 2. Traer los datos con el ID incluido (importante para editar/eliminar)
    this.players$ = collectionData(playersCollection, { idField: 'id' });
  }

  // Navegar a la ficha de detalles
  verDetalles(player: any) {
    this.router.navigate(['/player-detail'], { state: { player } });
  }

  // Navegar al formulario para EDITAR
  editarJugador(event: Event, player: any) {
    event.stopPropagation(); // Evita que se dispare verDetalles al hacer clic en el botón
    this.router.navigate(['/form-player'], { state: { player } });
  }

  // Navegar al formulario para CREAR NUEVO
  nuevoJugador() {
    this.router.navigate(['/form-player']);
  }

  irAVideos() {
    this.router.navigate(['/videos']);
  }
}
