import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UtilisateurService} from "../users/utilisateur.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  id?: number; // Utilisation du point d'interrogation pour indiquer que id peut être undefined

  constructor(private utilisateurService: UtilisateurService) { }

  // Fonction pour supprimer un utilisateur
  supprimerUtilisateur(): void {
    if (this.id !== undefined) { // Vérifiez si id est défini avant de l'utiliser
      this.utilisateurService.deleteUser(this.id).subscribe({
        next: () => {
          console.log('Utilisateur supprimé avec succès');
          // Mettez ici le code pour actualiser la liste des utilisateurs ou pour effectuer d'autres actions après la suppression
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        }
      });
    } else {
      console.error('ID de l\'utilisateur non défini'); // Gérez le cas où id est undefined
    }
  }
}
