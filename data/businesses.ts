import { CategoryId } from "./categories";

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  category: CategoryId; // High-level: "drinks", "food", etc.
  types: string[]; // Specific: ["coffee", "bbt"], ["sandwich", "breakfast"]
  image: ReturnType<typeof require>;

  offer: {
    title: string;
    description?: string;
    valueRange?: {
      min: number;
      max: number;
    };
  };

  requirements: {
    requiresApp: boolean;
    requiresEmail: boolean;
    requiresID: boolean;
    advanceSignupDays: number;
    ageRestriction?: number;
  };

  redemptionWindow: "day" | "week" | "month";

  hasMultipleLocations: boolean; // true = chain, false = single location

  instructions: string[];
  restrictions?: string[];

  isActive: boolean;
  verified: boolean;
  lastVerified?: Date;
  popularity: number;
}

export const restaurants: Restaurant[] = [
  {
    id: "starbucks-birthday",
    name: "Starbucks",
    description:
      "Get any size handcrafted beverage or food item free on your birthday when you're a Starbucks Rewards member",
    category: "drinks",
    types: ["coffee"],
    image: require("@/assets/images/freebies/starbucks.png"),

    offer: {
      title: "Free Birthday Drink or Food",
      description:
        "Any size handcrafted beverage OR any food item of your choice",
      valueRange: {
        min: 5.0,
        max: 15.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 7,
    },

    redemptionWindow: "day",
    hasMultipleLocations: true,

    instructions: [
      "Download the Starbucks app from the App Store or Google Play Store",
      "Create a Starbucks Rewards account or sign in if you already have one",
      "Go to Account settings and add your birthday",
      "Make sure you sign up at least 7 days before your birthday",
      "On your birthday, your free reward will automatically appear in your account",
      'Open the app and tap "Redeem" on your birthday reward',
      "Show the barcode to the barista at checkout",
      "Choose any handcrafted beverage (any size) OR any food item",
      "Enjoy your free birthday treat!",
    ],

    restrictions: [
      "Valid for 24 hours only (from 12:00 AM to 11:59 PM on your birthday)",
      "Must be redeemed in-store or through mobile order",
      "Cannot be combined with other offers or discounts",
      "One reward per person per birthday",
      "Must be an active Starbucks Rewards member",
      "Account must be created at least 7 days before your birthday",
      "Not valid for delivery orders",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-18"),
    popularity: 98,
  },
];
