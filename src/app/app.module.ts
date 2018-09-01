import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { HomeComponent } from 'core/components/home/home.component';
import { NavbarComponent } from 'core/components/navbar/navbar.component';
import { ProductFilterComponent } from 'core/components/product-filter/product-filter.component';
import { DatabaseModule } from './database/database.module';
import { NotFoundComponent } from 'core/exceptions/not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    [RouterModule.forRoot(appRoutes)],
    DatabaseModule,
    SharedModule,
    AdminModule,
    ShoppingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
