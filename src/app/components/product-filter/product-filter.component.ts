import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { Category } from 'shared/models/category';
import { CategoryService } from 'shared/services/category/category.service';

// Services
// Observables
/*
**Developed By: Arka Das
**Last Modified On: 22-08-2018
*/

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
 // ################## //
  categories: Category[];
  activeItem = 'all';
  // ################## //
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    // ################## //
    categoryService.getAll()
      .pipe(
        take(1),
        switchMap(categories => {
        this.categories = categories;
        this.categories.splice(0, 0, {
          key: 'all',
          name: 'All Categories',
          unit: ''
        });
        // ################## //
        return route.queryParamMap;
        })
      ).subscribe(params => {
          this.activeItem = (params.get('category')) ?  params.get('category') : 'all';
        });
   }
}
