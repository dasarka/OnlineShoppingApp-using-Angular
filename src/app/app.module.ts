// environment
import { environment } from '../environments/environment';
// guard
import { AdminAuthGuard } from './services/admin-auth-guard/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
// angular module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTableModule} from 'angular-6-datatable';
// component
// assests
import { ProductFilterComponent } from './common-assets/product-filter/product-filter.component';
import { ProductCardComponent } from './common-assets/product-card/product-card.component';
// general
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrdersComponent } from './components/orders/orders.component';
// admin
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
// exception
import { NotFoundComponent } from './exceptions/not-found/not-found.component';
// service
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { CategoryService } from './services/category/category.service';
import { ProductManagementService } from './services/product/product-management.service';
import { DataService } from './services/data/data.service';
import { ShoppingService } from './services/shopping/shopping.service';
// database
// firebase integrtion modules
import { AngularFireModule, FirebaseAppConfigToken, FirebaseAppNameToken, FirebaseOptionsToken } from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { ProductQuantityComponent } from './common-assets/product-quantity/product-quantity.component';
import { OrderService } from './services/order/order.service';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderCardComponent } from './common-assets/order-card/order-card.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'cart',
    component: ShoppingCartComponent
  },
  {
    path: 'check-out/success',
    component: OrderSuccessComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'my/orders/:orderId',
    component: OrderDetailsComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'my/orders',
    component: OrdersComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'admin/products/:productId',
    component: ProductFormComponent,
    canActivate : [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate : [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate : [AuthGuard, AdminAuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    OrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    NotFoundComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailsComponent,
    OrderCardComponent
  ],
  imports: [
    BrowserModule,
    // firebase modules
    // production purpose
      AngularFireModule,
    // dev purpose
     // AngularFireModule.initializeApp(FirebaseAppConfigToken, 'oshop'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    // bootstrap js module for angular
    NgbModule.forRoot(),
    [RouterModule.forRoot(appRoutes)],
    FormsModule,
    ReactiveFormsModule,
    DataTableModule
  ],
  providers: [
    // production purpose
      {provide: FirebaseOptionsToken, useValue: environment.firebaseConfig},
     // { provide: FirebaseAppNameToken, useValue: 'oShop' },
    //  { provide: FirebaseAppConfigToken, useValue: undefined },
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    DataService,
    ProductManagementService,
    CategoryService,
    ShoppingService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
