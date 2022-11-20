import { Component, OnInit } from '@angular/core';
import { CartItemsService } from '../services/cart-items.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  deliveryChecked = true;

  constructor(private cartItemService: CartItemsService) {}

  ngOnInit(): void {
    this.cartItemService.deliveryChecked.subscribe((res) => {
      this.deliveryChecked = res;
    });
  }
  pickuptime = '12:20pm';
  deliverytime = '50 minutes';
}
