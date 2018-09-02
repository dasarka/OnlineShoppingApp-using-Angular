import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'core/components/home/home.component';
import { NotFoundComponent } from 'core/exceptions/not-found/not-found.component';
import { ProductFilterComponent } from 'core/components/product-filter/product-filter.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    [RouterModule.forChild([])],
    SharedModule
  ],
  exports: [
    NavbarComponent
  ],
  declarations: [
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    ProductFilterComponent
  ]
})
export class CoreModule { }
