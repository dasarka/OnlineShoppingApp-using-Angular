import { CartItem } from '../../models/cart-item';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
// Services
import { AuthService } from '../../services/auth/auth.service';
// Models
import { AppUser } from '../../models/app-users';
import { UserRole} from '../../models/user-roles';
import { ShoppingService } from '../../services/shopping/shopping.service';
import { ShoppingCart } from '../../models/shopping-cart';

/*
**Developed By: Arka Das
**Last Modified On: 22-08-2018
*/

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // ################## //
  cart$: Observable<ShoppingCart>;
  appUser: AppUser;
  userRole: UserRole;
  // ################## //
  constructor(
    private authService: AuthService,
    private shoppingService: ShoppingService
  ) {}

  async ngOnInit() {

    this.userRole = {admin: false};
    // ################## //
    this.authService.appUser$.subscribe(user => {
      this.appUser = user;
    });
    // ################## //
    this.authService.userRole$.subscribe(role => {
      this.userRole = (role === null) ? {admin: false} : role;
    });

    this.cart$ = await this.shoppingService.getCartItems();
  }

  // ################## //
  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }
}
