import { Component, OnInit } from '@angular/core';
import { FoodCategory, FoodTag, MenuItem } from '../models/menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [
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
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
