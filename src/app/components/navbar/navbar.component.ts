import { Component } from '@angular/core';
// Services
import { AuthService } from '../../services/auth/auth.service';
// Models
import { AppUser } from '../../models/app-users';
import { UserRole} from '../../models/user-roles';

/*
**Developed By: Arka Das
**Last Modified On: 22-08-2018
*/

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // ################## //
  cartItemsCount: string;
  appUser: AppUser;
  userRole: UserRole;
  // ################## //
  constructor(private authService: AuthService) {
    this.userRole = {admin: false};
    const itemsCount = localStorage.getItem('cart-item-count');
    this.cartItemsCount = (itemsCount) ? itemsCount : '0';
    // ################## //
    authService.appUser$.subscribe(user => {
      this.appUser = user;
    });
    // ################## //
    authService.userRole$.subscribe(role => {
      this.userRole = (role === null) ? {admin: false} : role;
    });
   }
  // ################## //
  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }
}
