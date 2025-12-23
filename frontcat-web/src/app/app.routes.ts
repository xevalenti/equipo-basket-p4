import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './inicio/inicio.component';
import { EquiposComponent } from './equipos/equipos.component';
// Importa los demás cuando los crees...

export const routes: Routes = [
  { path: '', component: HomeComponent },         // Ahora el Home es la raíz
  { path: 'inicio', component: InicioComponent }, // Lista de jugadores
  { path: 'equipos', component: EquiposComponent },
  // { path: 'videos', component: VideosComponent },
  // { path: 'form-player', component: FormPlayerComponent },
];
