import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from 'database/services/data/data.service';
import { Category } from 'shared/models/category';

// Services
// Models
// Observables
/*
**Developed By: Arka Das
**Last Modified On: 26-08-2018
*/

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private dataService: DataService) {
   }
   // ********************************************************************************************** //
   // get all categories from firebase
   // ********************************************************************************************** //
  getAll(): Observable<Category[]> {
      return this.dataService.getAll('/categories', 'name');
   }
}
