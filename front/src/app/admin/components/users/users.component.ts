
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {User} from '../users/utilisateur.model';
import { UtilisateurService } from '../users/utilisateur.service';
import {Router, RouterLink} from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent   implements OnInit, OnDestroy {
  editor: FormGroup | undefined;

  users: User[] = [];
  isAddModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  utilisateurToEdit: User | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private utilisateurService: UtilisateurService, private router: Router) { }

  ngOnInit(): void {
    this.editor = new FormGroup({
      postName: new FormControl(''),
      postEmail: new FormControl(''),
      postPassword: new FormControl(''),
      postRole: new FormControl('')
    });

    this.loadUtilisateurs();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadUtilisateurs(): void {
    this.subscriptions.push(
      this.utilisateurService.getAllUtilisateurs().subscribe(
        users => {
          this.users = users;
        },
        error => {
          console.error('Error loading utilisateurs:', error);
          // Handle error appropriately, e.g., show error message to the user
        }
      )
    );
  }

  deleteUser(id: number): void {
    this.subscriptions.push(
      this.utilisateurService.deleteUser(id).subscribe(() => {
        this.loadUtilisateurs();
      })
    );
  }

  createUser(): void {
    if (this.editor && this.editor.valid) {
      const formValues = this.editor.value;
      const newUser: User = {
        id: 0,
        name: formValues.postName !== undefined ? formValues.postName : '',
        email: formValues.postEmail !== undefined ? formValues.postEmail : '',
        password: formValues.postPassword !== undefined ? formValues.postPassword : '',
        role: formValues.postRole !== undefined ? formValues.postRole : ''
      };

      this.subscriptions.push(
        this.utilisateurService.createUser(newUser).subscribe((response: User) => {
          console.log("New utilisateur added:", response);
          this.loadUtilisateurs();
          this.router.navigate(['add-utilisateur']); // Move navigation here
        })
      );
    }

  }


  updateUser(): void {
    if (this.utilisateurToEdit) {
      this.subscriptions.push(
        this.utilisateurService.updateUser(this.utilisateurToEdit.id, this.utilisateurToEdit).subscribe(() => {
          console.log("Utilisateur updated:", this.utilisateurToEdit);
          this.isEditModalOpen = false; // Close the edit modal after update
          this.loadUtilisateurs();
        })
      );
    }
    this.router.navigate(['edit-utilisateur']);
  }

  protected readonly User = User;
}
