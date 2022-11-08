import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemLargeComponent } from './cart-item-large.component';

describe('CartItemLargeComponent', () => {
  let component: CartItemLargeComponent;
  let fixture: ComponentFixture<CartItemLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemLargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
