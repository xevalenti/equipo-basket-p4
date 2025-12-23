import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-form-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-player.component.html',
  styleUrls: ['./form-player.component.scss']
})
export class FormPlayerComponent implements OnInit {
  isEditMode = false;
  saving = false;
  playerId: string | null = null;

  player: any = {
    alias: '', name: '', lastName: '', position: '',
    age: '', height: '', weight: '', teams: '',
    initials: '', headshotBase64: '', video: ''
  };

  selectedImagePreview: string | null = null;

  localVideos = ["dalenTerry.mp4", "Ayo_Dosunmu.mp4", "jalenSmith.mp4", "julianPhillips.mp4", "noaEssengue.mp4", "treJones.mp4", "Coby_White.mp4"];

  constructor(
    private firestore: Firestore,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Verificamos si venimos de "Editar" (pasando el objeto por estado de navegación)
    const state = window.history.state;
    if (state && state.player) {
      this.isEditMode = true;
      this.player = { ...state.player };
      this.playerId = state.player.id;
      this.selectedImagePreview = this.player.headshotBase64;
    }
  }

  // Manejar selección de imagen (Conversión a Base64)
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImagePreview = e.target.result;
        this.player.headshotBase64 = e.target.result; // El string base64
      };
      reader.readAsDataURL(file);
    }
  }

  async savePlayer() {
    this.saving = true;
    try {
      const playersCollection = collection(this.firestore, 'players');

      // Limpieza de datos (asegurar que edad sea número)
      const dataToSave = {
        ...this.player,
        age: parseInt(this.player.age) || 0
      };

      if (this.isEditMode && this.playerId) {
        const docRef = doc(this.firestore, `players/${this.playerId}`);
        await updateDoc(docRef, dataToSave);
        alert('Jugador actualizado');
      } else {
        await addDoc(playersCollection, dataToSave);
        alert('Jugador creado');
      }
      this.router.navigate(['/inicio']);
    } catch (error) {
      console.error(error);
      alert('Error al guardar');
    } finally {
      this.saving = false;
    }
  }

  async deletePlayer() {
    if (confirm(`¿Seguro que quieres eliminar a ${this.player.name}?`) && this.playerId) {
      this.saving = true;
      try {
        const docRef = doc(this.firestore, `players/${this.playerId}`);
        await deleteDoc(docRef);
        this.router.navigate(['/inicio']);
      } catch (error) {
        alert('Error al eliminar');
      } finally {
        this.saving = false;
      }
    }
  }
}
