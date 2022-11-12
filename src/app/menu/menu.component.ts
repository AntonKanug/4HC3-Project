import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { map, Observable, startWith } from 'rxjs';
import { FoodCategory, FoodTag, MenuItem } from '../models/menu-item';
import { CartItemsService } from '../services/cart-items.service';
import { CalculateNumberOfItems } from '../helpers/calculateTotalItemsInCart';

enum SortOption {
  PHTL = 'Price (High to Low)',
  PLTH = 'Price (Low to High)',
  CHTL = 'Calories (High to Low)',
  CLTH = 'Calories (Low to High)',
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  foodCategories = Object.values(FoodCategory);

  dietaryRestrictions = Object.values(FoodTag);
  dietaryFilters = new FormControl('');

  searchableNames: Observable<string[]>;
  searchControl = new FormControl('');

  sortOption = '';
  sortOptions: string[] = Object.values(SortOption);

  allItems: MenuItem[] = [
    {
      name: 'Shiba Inu',
      price: 99.99,
      description:
        'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.`      ',
      calories: 350,
      tags: [FoodTag.Halal, FoodTag.Vegetarian],
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
  currentItems: MenuItem[] = this.allItems;

  cartItems: MenuItem[] = [];

  searchValue = '';
  curTabLabel = 'All';

  constructor(private cartItemService: CartItemsService) {}

  ngOnInit(): void {
    this.cartItemService.cartItems.subscribe((res) => {
      this.cartItems = res;
    });

    this.searchableNames = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._search(value || ''))
    );
  }

  private _search(value: string): string[] {
    this.searchValue = value.toLowerCase();
    this.filterItems();
    return this.currentItems.map((item) => item.name);
  }

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
        break;
      case 'Favourites':
        this.currentItems = this.allItems.filter((item) => item.isFavorite);
        break;
      case 'Popular':
        this.currentItems = this.allItems.filter((item) => item.isPopular);
        break;
      default:
        const category = this.curTabLabel as FoodCategory;
        this.currentItems = this.allItems.filter(
          (item) => item.category === category
        );
        break;
    }
    const dietaryFilters = this.dietaryFilters.value as FoodTag[];
    this.currentItems = this.currentItems.filter(
      (item) =>
        item.name.toLowerCase().includes(this.searchValue) &&
        (item.tags.some((t) => dietaryFilters.includes(t)) ||
          dietaryFilters.length === 0)
    );
    const sortOption = this.sortOption as SortOption;
    switch (sortOption) {
      case SortOption.PLTH:
        this.currentItems = this.currentItems.sort((i) => i.price).reverse();
        break;
      case SortOption.PHTL:
        this.currentItems = this.currentItems.sort((i) => i.price);
        break;
      case SortOption.CLTH:
        this.currentItems = this.currentItems.sort((i) => i.calories).reverse();
        break;
      case SortOption.CHTL:
        this.currentItems = this.currentItems.sort((i) => i.calories);
        break;
      default:
        break;
    }
  }

  removeItemFromCart(item: MenuItem) {
    this.cartItemService.removeItem(item);
  }

  getNumberOfItems() {
    return CalculateNumberOfItems(this.cartItems);
  }
}
