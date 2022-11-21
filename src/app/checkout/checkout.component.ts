import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuItem } from '../models/menu-item';
import { CartItemsService } from '../services/cart-items.service';

interface Month {
  value: string;
  viewValue: string;
}

interface Year {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: MenuItem[] = [];

  deliveryChecked = false;
  deliverytime = '50 minutes';

  constructor(private cartItemService: CartItemsService) {}

  ngOnInit(): void {
    this.cartItemService.cartItems.subscribe((res) => {
      this.cartItems = res;
    });
    this.cartItemService.deliveryChecked.subscribe((res) => {
      this.deliveryChecked = res;
    });
  }
  deliveryCost = 4.25;

  cardForm = new FormGroup({
    cardNumber: new FormControl('', [Validators.required]),
    CVV: new FormControl('', [Validators.required]),
    month: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
  });

  deliveryForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
  });

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

  toggleDelivered() {
    this.cartItemService.toggleDeliveryChecked();
  }

  months: Month[] = [
    { value: 'jan-0', viewValue: 'January' },
    { value: 'feb-1', viewValue: 'February' },
    { value: 'mar-2', viewValue: 'March' },
    { value: 'apr-3', viewValue: 'April' },
    { value: 'may-4', viewValue: 'May' },
    { value: 'jun-5', viewValue: 'June' },
    { value: 'jul-6', viewValue: 'July' },
    { value: 'aug-7', viewValue: 'August' },
    { value: 'sep-8', viewValue: 'September' },
    { value: 'oct-9', viewValue: 'October' },
    { value: 'nov-10', viewValue: 'November' },
    { value: 'dec-11', viewValue: 'December' },
  ];

  years: Year[] = [
    { value: '2022-0', viewValue: '2022' },
    { value: '2023-1', viewValue: '2023' },
    { value: '2024-2', viewValue: '2024' },
    { value: '2025-3', viewValue: '2025' },
    { value: '2026-4', viewValue: '2026' },
    { value: '2027-5', viewValue: '2027' },
    { value: '2028-6', viewValue: '2028' },
  ];

  provinces: Year[] = [
    { viewValue: 'AB', value: 'Alberta' },
    { viewValue: 'BC', value: 'British Columbia' },
    { viewValue: 'MB', value: 'Manitoba' },
    { viewValue: 'NB', value: 'New Brunswick' },
    { viewValue: 'NL', value: 'Newfoundland and Labrador' },
    { viewValue: 'NS', value: 'Nova Scotia' },
    { viewValue: 'NT', value: 'Northwest Territories' },
    { viewValue: 'NU', value: 'Nunavut' },
    { viewValue: 'ON', value: 'Ontario' },
    { viewValue: 'PE', value: 'Prince Edward Island' },
    { viewValue: 'QC', value: 'Quebec' },
    { viewValue: 'SK', value: 'Saskatchewan' },
    { viewValue: 'YT', value: 'Yukon' },
  ];

  checkValid() {
    console.log(this.cardForm.invalid, this.deliveryForm.invalid);
    if (this.cardForm.invalid) return true;
    if (this.deliveryChecked && this.deliveryForm.invalid) return true;
    return false;
  }
}
