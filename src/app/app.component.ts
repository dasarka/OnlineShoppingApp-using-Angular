import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oShop';
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
      authService.user.subscribe(user => {
      if (!user) {return; }
      userService.save(user);
      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) {return; }
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
