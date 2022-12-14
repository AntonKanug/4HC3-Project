import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../models/menu-item';
import { FormGroup, FormControl } from '@angular/forms';
import { CartItemsService } from '../services/cart-items.service';
import { CalculateNumberOfItems } from '../helpers/calculateTotalItemsInCart';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: MenuItem[] = [];

  constructor(private cartItemService: CartItemsService) {}
  ngOnInit(): void {
    this.cartItemService.cartItems.subscribe((res) => {
      this.cartItems = res;
    });
  }

  onSubmit() {
    // might want to pass this to the checkout page
  }

  getCartTotal(): number {
    var total: number = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      total += this.cartItems[i].price * this.cartItems[i].count!;
    }
    return Math.round(total * 100) / 100;
  }

  getNumberOfItems() {
    return CalculateNumberOfItems(this.cartItems);
  }

  removeCartItem(item: MenuItem) {
    this.cartItemService.removeItem(item);
  }
}
