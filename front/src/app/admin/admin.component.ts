import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink, SidebarComponent, RouterOutlet, DashboardComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

}
