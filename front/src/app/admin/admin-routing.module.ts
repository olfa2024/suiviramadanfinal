import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import {EditUtilisateurComponent} from "./components/edit-utilisateur/edit-utilisateur.component";
import {AddUtilisateurComponent} from "./components/add-utilisateur/add-utilisateur.component";
import {UsersComponent} from "./components/users/users.component";
import {LoginComponent} from "../login/login.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {DeleteUserComponent} from "./components/delete-user/delete-user.component";


const routes: Routes = [
  { path: '', component: AdminComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'sidebar', component: SidebarComponent },
      { path: 'edit-utilisateur', component: EditUtilisateurComponent },
      { path: 'add-utilisateur', component: AddUtilisateurComponent },
      { path: 'delete-user', component: DeleteUserComponent },
      { path: 'users', component: UsersComponent },
      { path: 'login', component: LoginComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
