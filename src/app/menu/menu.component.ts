import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FoodCategory, FoodTag, MenuItem } from '../models/menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  foodCategories = Object.values(FoodCategory);
  allItems: MenuItem[] = [
    {
      name: 'Shiba Inu',
      price: 99.99,
      description:
        'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.`      ',
      calories: 350,
      tags: [FoodTag.Halal],
      category: FoodCategory.Burger,
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      isPopular: true,
      isFavorite: false,
      count: 3
    },
    {
      name: 'Apple Bowl',
      price: 9.99,
      description: 'A juicy bowl of apples.',
      calories: 200,
      tags: [FoodTag.Vegetarian],
      category: FoodCategory.Salad,
      imageUrl:
        'https://media.istockphoto.com/id/518339352/photo/apples-in-bowl.jpg?s=612x612&w=0&k=20&c=5OESjebtcZBrD6t6O82Ohf_pmJITLdJFdavfTB5e57I=',
      isPopular: false,
      isFavorite: false,
      count: 8,
    },
  ];
  currentItems: MenuItem[] = this.allItems;
  curTabLabel = 'All';

  constructor() {}

  ngOnInit(): void {}

  onChangeTab(event: MatTabChangeEvent): void {
    this.curTabLabel = event.tab.textLabel;
    this.filterItems();
  }

  toggleFavourite(item: MenuItem): void {
    this.filterItems();
  }

  filterItems() {
    switch (this.curTabLabel) {
      case 'All':
        this.currentItems = this.allItems;
        return;
      case 'Favourites':
        this.currentItems = this.allItems.filter((item) => item.isFavorite);
        return;
      case 'Popular':
        this.currentItems = this.allItems.filter((item) => item.isPopular);
        return;
      default:
        const category = this.curTabLabel as FoodCategory;
        this.currentItems = this.allItems.filter(
          (item) => item.category === category
        );
    }
  }

  removeItemFromCart(){
    console.log("i should remove an item from the cart")
  }
}
