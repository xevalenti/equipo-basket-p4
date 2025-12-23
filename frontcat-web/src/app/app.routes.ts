import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EquiposComponent } from './equipos/equipos.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormPlayerComponent } from './form-player/form-player.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { VideosComponent } from './videos/videos.component';
import { MediaPlayerComponent } from './media-player/media-player.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jugadores', component: InicioComponent },
  { path: 'equipos', component: EquiposComponent }, 
  { path: 'form-player', component: FormPlayerComponent },
  { path: 'player-detail', component: PlayerDetailComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'media-player', component: MediaPlayerComponent },
  { path: '**', redirectTo: '' } // Siempre el último
];
