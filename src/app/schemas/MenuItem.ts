enum FoodType {
  burger,
  sandwich,
  pizza
}

export interface MenuItem {
    name: string,
    price: number,
    description?: string,
    imageUrl?: string,
    calories?: number,
    tags?: [string],
    type?: FoodType,
    favourite?: boolean,
    popular?: boolean
}

