import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // <--- El sustituto de useNavigation

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) {}
  
  navegar(ruta: string) {
    console.log("Intentando navegar a:", ruta);
    this.router.navigate(['/' + ruta]);
  }
}
