import { ShoppingService } from 'shared/services/shopping/shopping.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { UserService } from 'database/services/user/user.service';
import { AuthService } from 'shared/services/auth/auth.service';

/*
**Developed By: Arka Das
**Last Modified On: 22-08-2018
*/


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // ################## //
  title = 'oShop';
  // ################## //
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private shoppingService: ShoppingService,
    private router: Router
  ) {
      authService.user.subscribe(user => {
      if (!user) {return; }
      // ################## //
      userService.save(user);
      localStorage.setItem('userId', user.uid);
      // ################## //
      shoppingService.updateAllCartItems(user.uid);
      // ################## //
      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) {return; }
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
      router.onSameUrlNavigation = 'reload';
    });
  }
}
