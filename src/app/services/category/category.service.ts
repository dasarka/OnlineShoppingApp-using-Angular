import { Injectable } from '@angular/core';
// Services
import { DataService } from '../data/data.service';
// Models
import { Category } from '../../models/category';
// Observables
import { Observable } from 'rxjs/Observable';

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
