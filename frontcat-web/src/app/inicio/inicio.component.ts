import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, query, orderBy, limit, onSnapshot, startAfter, getDocs, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  players: any[] = [];
  loading: boolean = true;
  lastDoc: any = null;
  isFetchingMore: boolean = false;
  searchText: string = '';
  filterBy: string = 'nombre';

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    // Equivalente al useEffect de React
    const playersCol = collection(this.firestore, 'players');
    const q = query(playersCol, orderBy('name'), limit(10));

    onSnapshot(q, (snapshot) => {
      this.players = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.lastDoc = snapshot.docs[snapshot.docs.length - 1];
      this.loading = false;
    });
  }

  async fetchMore() {
    if (!this.lastDoc || this.isFetchingMore) return;
    this.isFetchingMore = true;

    const playersCol = collection(this.firestore, 'players');
    const q = query(playersCol, orderBy('name'), startAfter(this.lastDoc), limit(10));

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.players = [...this.players, ...newData];
      this.lastDoc = snapshot.docs[snapshot.docs.length - 1];
    }
    this.isFetchingMore = false;
  }

  get filteredPlayers() {
    return this.players.filter(p => {
      const t = this.searchText.toLowerCase();
      if (!t) return true;
      if (this.filterBy === 'nombre') return `${p.name} ${p.lastName}`.toLowerCase().includes(t);
      if (this.filterBy === 'posicion') return (p.position || '').toLowerCase().includes(t);
      if (this.filterBy === 'edad') return String(p.age || '').includes(t);
      return true;
    });
  }

  setFilter(filter: string) {
    this.filterBy = filter;
  }
}
