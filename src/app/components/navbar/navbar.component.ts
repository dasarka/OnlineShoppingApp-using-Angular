import { AppUser } from './../../models/app-users';
import { UserRoles } from './../../models/user-roles';
import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: AppUser;
  role: UserRoles;
  constructor(public authService: AuthService) {
    authService.appUser$.subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
    authService.userRoles$.subscribe(role => {
      this.role = role;
      console.log(this.role);
    });
   }

  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }
}
