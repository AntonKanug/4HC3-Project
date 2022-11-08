import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../schemas/MenuItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  counter = 0;
  cartItems: MenuItem[] = [
    {name: "Potato", price: 4.97, imageUrl: "../../assets/images/menuItems/potato.png", description: "One yummy peeled potato. One yummy peeled potato. One yummy peeled potato. ", calories: 50},
    {name: "Watermelon", price: 2.00, imageUrl: "../../assets/images/menuItems/watermelon.png", description: "A juicy red watermelon with seeds. A juicy red watermelon with seeds. A juicy red watermelon with seeds. ", calories: 75},
    {name: "Croissant", price: 4.32, imageUrl: "../../assets/images/menuItems/croissant.png", description: "A buttery croissant freshly made from paris. A buttery croissant freshly made from paris. A buttery croissant freshly made from paris. ", calories: 290}
  ]

  increaseButtonHandler(){
    this.counter += 1;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
