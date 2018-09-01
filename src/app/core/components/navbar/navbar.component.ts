import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppUser } from 'shared/models/app-users';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { UserRole } from 'shared/models/user-roles';
import { AuthService } from 'shared/services/auth/auth.service';
import { ShoppingService } from 'shared/services/shopping/shopping.service';
import { take } from 'rxjs/operators';

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
    this.authService.appUser$.pipe(take(1)).subscribe(user => {
      this.appUser = user;
    });
    // ################## //
    this.authService.userRole$.pipe(take(1)).subscribe(role => {
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
