
import { UserRoles } from './models/user-roles';
import { AppUser } from './models/app-users';
import { AdminAuthGuard } from './services/admin-auth-guard/admin-auth-guard.service';
import { UserService } from './services/user/user.service';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// firebase integrtion modules
import { AngularFireModule, FirebaseAppConfigToken } from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { NotFoundComponent } from './exceptions/not-found/not-found.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductsComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'check-out/success', component: OrderSuccessComponent, canActivate : [AuthGuard] },
  { path: 'check-out', component: CheckOutComponent, canActivate : [AuthGuard] },
  { path: 'my/orders', component: OrdersComponent, canActivate : [AuthGuard] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate : [AuthGuard, AdminAuthGuard] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate : [AuthGuard, AdminAuthGuard]  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    OrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    // firebase modules
    AngularFireModule.initializeApp(environment.firebase, 'oshop'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    // bootstrap js module for angular
    NgbModule.forRoot(),
    [RouterModule.forRoot(appRoutes)]
  ],
  providers: [
    {provide: FirebaseAppConfigToken, useValue: environment.firebase},
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
