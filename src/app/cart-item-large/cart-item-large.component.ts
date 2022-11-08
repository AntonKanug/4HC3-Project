import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../schemas/MenuItem';

@Component({
  selector: 'app-cart-item-large',
  templateUrl: './cart-item-large.component.html',
  styleUrls: ['./cart-item-large.component.scss']
})
export class CartItemLargeComponent implements OnInit {

  @Input() CartItem : MenuItem | undefined;
  @Input() a : number | undefined;
  constructor() {  }

  ngOnInit(): void {
  }

}
