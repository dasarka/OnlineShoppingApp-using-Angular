import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard/auth-guard.service';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderService } from './services/order/order.service';

const shoppingRoutes: Routes = [
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
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    [RouterModule.forChild(shoppingRoutes)],
    SharedModule
  ],
  declarations: [
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    OrderDetailsComponent,
    OrdersComponent
  ],
  providers: [
    OrderService
  ]
})
export class ShoppingModule { }
