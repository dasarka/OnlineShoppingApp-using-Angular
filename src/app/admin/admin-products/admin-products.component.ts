import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  newProduct() {
    this.router.navigate(['/admin/products/new']);
  }
}
