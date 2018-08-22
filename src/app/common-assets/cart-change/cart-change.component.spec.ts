import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartChangeComponent } from './cart-change.component';

describe('CartChangeComponent', () => {
  let component: CartChangeComponent;
  let fixture: ComponentFixture<CartChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
