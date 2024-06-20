import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoursService} from "./cours.service";

@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  imagesAndVideos: any[] = []; // Déclarer un tableau pour stocker les images et les vidéos

  constructor(private backendService: CoursService) { } // Injecter votre service Backend

  ngOnInit(): void {
    this.loadImagesAndVideos(); // Appeler la méthode pour charger les images et les vidéos au chargement du composant
  }

  loadImagesAndVideos(): void {
    this.backendService.getImagesAndVideos().subscribe(data => { // Utiliser votre service pour récupérer les données depuis le backend
      this.imagesAndVideos = data; // Stocker les données dans le tableau
    });
  }
}
