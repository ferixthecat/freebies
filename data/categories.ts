export interface Category {
  id: string;
  name: string;
  placesCount: number;
  image: any;
  backgroundColor: string;
}

export const categories: Category[] = [
  {
    id: "food",
    name: "Food",
    placesCount: 12,
    image: require("@/assets/images/categories/food.jpg"),
    backgroundColor: "#E8DCD9",
  },
  {
    id: "drinks",
    name: "Drinks",
    placesCount: 8,
    image: require("@/assets/images/categories/drinks.jpg"),
    backgroundColor: "#4ECDC4",
  },
  {
    id: "desserts",
    name: "Desserts",
    placesCount: 6,
    image: require("@/assets/images/categories/desserts.jpg"),
    backgroundColor: "#FFB6C1",
  },
  {
    id: "beauty",
    name: "Beauty",
    placesCount: 5,
    image: require("@/assets/images/categories/beauty.jpg"),
    backgroundColor: "#DDA0DD",
  },
  {
    id: "retail",
    name: "Retail",
    placesCount: 7,
    image: require("@/assets/images/categories/retail.jpg"),
    backgroundColor: "#87CEEB",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    placesCount: 4,
    image: require("@/assets/images/categories/entertainment.jpg"),
    backgroundColor: "#FFD700",
  },
];

export type CategoryId = (typeof categories)[number]["id"];
