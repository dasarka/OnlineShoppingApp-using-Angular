import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FavouriteComponent } from './favourite/favourite.component';

const featureRoutes = [
  {
    path: 'wish-list',
    component: FavouriteComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forChild(featureRoutes)]
  ],
  declarations: [
    FavouriteComponent
  ]
})
export class FeaturesModule { }
