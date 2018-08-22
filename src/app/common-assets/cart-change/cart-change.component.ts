import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cart-change',
  templateUrl: './cart-change.component.html',
  styleUrls: ['./cart-change.component.css']
})
export class CartChangeComponent implements OnInit {
  @Input('key') key: string;
  @Input('count') count: string;

  constructor() { }

  ngOnInit() {
  }

}
