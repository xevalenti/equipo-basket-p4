import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss']
})
export class EquiposComponent {
  modalVisible = false;
  selectedLogo: string | null = null;

  // En Angular, las rutas de imágenes son strings (path)
  equiposNBA = [
    { name: "Atlanta Hawks", logo: "assets/fotos/logos/atlanta.png" },
    { name: "Boston Celtics", logo: "assets/fotos/logos/boston.png" },
    { name: "Brooklyn Nets", logo: "assets/fotos/logos/brooklyn.png" },
    { name: "Charlotte Hornets", logo: "assets/fotos/logos/charlote.png" },
    { name: "Chicago Bulls", logo: "assets/fotos/logos/chicago.png" },
    { name: "Cleveland Cavaliers", logo: "assets/fotos/logos/cleveland.png" },
    { name: "Dallas Mavericks", logo: "assets/fotos/logos/mavericks.png" },
    { name: "Denver Nuggets", logo: "assets/fotos/logos/denver.png" },
    { name: "Detroit Pistons", logo: "assets/fotos/logos/detroit.png" },
    { name: "Golden State Warriors", logo: "assets/fotos/logos/golden.png" },
    { name: "Houston Rockets", logo: "assets/fotos/logos/houston.png" },
    { name: "Indiana Pacers", logo: "assets/fotos/logos/indiana.png" },
    { name: "LA Clippers", logo: "assets/fotos/logos/clippers.png" },
    { name: "Los Angeles Lakers", logo: "assets/fotos/logos/lakers.png" },
    { name: "Memphis Grizzlies", logo: "assets/fotos/logos/memphis.png" },
    { name: "Miami Heat", logo: "assets/fotos/logos/miami.png" },
    { name: "Milwaukee Bucks", logo: "assets/fotos/logos/mil.png" },
    { name: "Minnesota Timberwolves", logo: "assets/fotos/logos/minnesota.png" },
    { name: "New Orleans Pelicans", logo: "assets/fotos/logos/pelicans.png" },
    { name: "New York Knicks", logo: "assets/fotos/logos/knicks.png" },
    { name: "Oklahoma City Thunder", logo: "assets/fotos/logos/okc.png" },
    { name: "Orlando Magic", logo: "assets/fotos/logos/orlando.png" },
    { name: "Philadelphia 76ers", logo: "assets/fotos/logos/76.png" },
    { name: "Phoenix Suns", logo: "assets/fotos/logos/phoenix.png" },
    { name: "Portland Trail Blazers", logo: "assets/fotos/logos/portland.png" },
    { name: "Sacramento Kings", logo: "assets/fotos/logos/sacramento.png" },
    { name: "San Antonio Spurs", logo: "assets/fotos/logos/spurs.png" },
    { name: "Toronto Raptors", logo: "assets/fotos/logos/toronto.png" },
    { name: "Utah Jazz", logo: "assets/fotos/logos/jazz.png" },
    { name: "Washington Wizards", logo: "assets/fotos/logos/wizards.png" },
  ];

  handlePress(logo: string) {
    this.selectedLogo = logo;
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
    this.selectedLogo = null;
  }
}
