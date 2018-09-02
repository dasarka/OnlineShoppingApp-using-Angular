import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from 'core/components/home/home.component';
import { CoreModule } from 'core/core.module';
import { NotFoundComponent } from 'core/exceptions/not-found/not-found.component';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { DatabaseModule } from './database/database.module';
import { FeaturesModule } from './features/features.module';
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
    CoreModule,
    DatabaseModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    FeaturesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
