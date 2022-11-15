import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartItems: MenuItem[] = [];

  constructor(private cartItemService: CartItemsService) {}
  
  ngOnInit(): void {
    this.cartItemService.cartItems.subscribe((res) => {
      this.cartItems = res;
    });
  }
  deliveryChecked = false;
  deliveryCost = 4.25;
  
  cardForm = new FormGroup({
    CardNumber: new FormControl(''),
    CVV: new FormControl(''),
  });


  deliveryForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    address2: new FormControl(''),
    city: new FormControl(''),
    province: new FormControl(''),
    postalCode: new FormControl(''),
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

  months: Month[] = [
    {value:'jan-0', viewValue:'January'},
    {value:'feb-1', viewValue:'February'},
    {value:'mar-2', viewValue:'March'},
    {value:'apr-3', viewValue:'April'},
    {value:'may-4', viewValue:'May'},
    {value:'jun-5', viewValue:'June'},
    {value:'jul-6', viewValue:'July'},
    {value:'aug-7', viewValue:'August'},
    {value:'sep-8', viewValue:'September'},
    {value:'oct-9', viewValue:'October'},
    {value:'nov-10', viewValue:'November'},
    {value:'dec-11', viewValue:'December'},
  ]

  years: Year[] = [
    {value:'2022-0', viewValue:'2022'},
    {value:'2023-1', viewValue:'2023'},
    {value:'2024-2', viewValue:'2024'},
    {value:'2025-3', viewValue:'2025'},
    {value:'2026-4', viewValue:'2026'},
    {value:'2027-5', viewValue:'2027'},
    {value:'2028-6', viewValue:'2028'},
  ]
}
