import { AppUser } from './../../models/app-users';
import { UserRole} from './../../models/user-roles';
import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  appUser: AppUser;
  userRole: UserRole;
  constructor(private authService: AuthService) {
    this.userRole = {admin: false};
    authService.appUser$.subscribe(user => {
      this.appUser = user;
    });
    authService.userRole$.subscribe(role => {
      this.userRole = (role === null) ? {admin: false} : role;
    });
   }

  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }
}
