
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../users/utilisateur.service';
import { User } from '../users/utilisateur.model';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-utilisateur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-utilisateur.component.html',
  styleUrls: ['./edit-utilisateur.component.css']
})
export class EditUtilisateurComponent   implements OnInit {

  isUpdating: boolean = false;
  editor = new FormGroup({
    postId: new FormControl({ value: '', disabled: true }),
    postName: new FormControl('', Validators.required),
    postEmail: new FormControl('', Validators.required),
    postPassword: new FormControl('', Validators.required),
    postRole: new FormControl('', Validators.required)
  });

  public postId!: number;
  public postToEdit: User = new User(0, '', '', '', '');
  public message = '';

  constructor(private utilisateurService: UtilisateurService, private route: ActivatedRoute) {}

  ngOnInit() {
    const postIdString = this.route.snapshot.paramMap.get('id');
    this.postId = postIdString ? parseInt(postIdString, 10) : 0;

    if (this.postId) {
      this.utilisateurService.getUtilisateurById(this.postId).subscribe((user: User) => {
        if (user) {
          this.postToEdit = user;
          this.editor.patchValue({
            postId: user.id ? user.id.toString() : null,
            postName: user.name,
            postEmail: user.email,
            postPassword: user.password,
            postRole: user.role
          });
        }
      });
    }
  }

  updateUtilisateur() {
    this.isUpdating = true;

    const updatedUser: User = {
      id: this.postToEdit.id,
      name: this.editor.value.postName ?? '',
      email: this.editor.value.postEmail ?? '',
      password: this.editor.value.postPassword ?? '',
      role: this.editor.value.postRole ?? ''
    };

    this.utilisateurService.updateUser(this.postToEdit.id, updatedUser).subscribe(
      () => {
        this.message = "Successfully edited utilisateur";
        this.isUpdating = false;
      },
      (error) => {
        console.error("Error occurred while updating utilisateur:", error);
        this.message = "Failed to update utilisateur";
        this.isUpdating = false;
      }
    );
  }
}
