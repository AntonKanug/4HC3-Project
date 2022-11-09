export interface MenuItem {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  calories: number;
  tags: [string];
  category: FoodCategory;
}

export enum FoodCategory {
  Burger,
  Seafood,
}
