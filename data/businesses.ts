import { CategoryId } from "./categories";

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  category: CategoryId; // High-level: "drinks", "food", "desserts", "beauty", "retail", "entertainment".
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
  {
    id: "chatime-birthday",
    name: "Chatime",
    description:
      "Get a free regular-sized drink on your birthday through the Chatime Societea Rewards program",
    category: "drinks",
    types: ["bubble-tea", "bbt"],
    image: require("@/assets/images/freebies/chatime.png"),

    offer: {
      title: "Free Birthday Drink",
      description: "One complimentary regular-sized beverage (any flavor)",
      valueRange: {
        min: 6.0,
        max: 9.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 7,
    },

    redemptionWindow: "week",
    hasMultipleLocations: true,

    instructions: [
      "Download the Chatime Societea Rewards app",
      "Create an account and add your birthday at least 7 days before",
      "Make a minimum purchase of $2.50 to activate your account",
      "Your birthday reward will automatically load 7 days before your birthday",
      "The free drink voucher is valid for 7 days before and 7 days after your birthday",
      "Visit any Chatime location and tell the Tearista it's your birthday",
      "Tap your rewards card or scan the app to redeem your free regular-size drink",
    ],

    restrictions: [
      "Must register birthday at least 7 days in advance",
      "Minimum purchase of $2.50 required to activate account",
      "Valid for regular size drinks only",
      "Excludes size upgrades, additional toppings, and milk substitutions",
      "Valid at participating Chatime and Bake Code locations in Ontario and British Columbia",
      "One reward per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 92,
  },
  {
    id: "tim-hortons-birthday",
    name: "Tim Hortons",
    description:
      "Celebrate with a free breakfast sandwich or drink when you're a Tims Rewards member",
    category: "food",
    types: ["breakfast", "coffee", "fast-food"],
    image: require("@/assets/images/freebies/tim-hortons.png"),

    offer: {
      title: "Free Breakfast Sandwich or Drink",
      description: "Choose from eligible breakfast sandwiches or drinks",
      valueRange: {
        min: 4.0,
        max: 8.0,
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
      "Download the Tim Hortons app and create a Tims Rewards account",
      "Add your birthday to your account settings at least 7 days before",
      "Make at least one purchase within the last 12 months by scanning for Tims Rewards",
      "Your birthday offer will appear in your account 2 days before your birthday at 8am",
      "Activate the offer in the app",
      "Visit any Tim Hortons location and scan your app to redeem",
    ],

    restrictions: [
      "Must add birthday at least 7 days before your birthday",
      "Must have scanned for Tims Rewards at least once in the last 12 months",
      "Valid for select breakfast sandwiches or drinks only (list available in app)",
      "Cannot be combined with other offers",
      "One reward per birthday",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 95,
  },
  {
    id: "dairy-queen-birthday",
    name: "Dairy Queen",
    description:
      "Get a birthday treat when you're part of the Blizzard Fan Club",
    category: "desserts",
    types: ["ice-cream", "frozen-treats"],
    image: require("@/assets/images/freebies/dairy-queen.png"),

    offer: {
      title: "Birthday Blizzard Treat",
      description: "BOGO free Blizzard coupon",
      valueRange: {
        min: 6.0,
        max: 8.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for the Blizzard Fan Club on the Dairy Queen website",
      "Provide your birthday during registration",
      "You'll receive a BOGO free Blizzard coupon via email during your birthday month",
      "Visit any participating Dairy Queen location",
      "Present your coupon to redeem",
    ],

    restrictions: [
      "Buy one Blizzard, get one free (BOGO)",
      "Valid at participating locations only",
      "Cannot be combined with other offers",
      "Coupon valid for your birthday month",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 88,
  },
  {
    id: "dennys-birthday",
    name: "Denny's",
    description:
      "Build your own free Grand Slam breakfast on your actual birthday",
    category: "food",
    types: ["breakfast", "diner"],
    image: require("@/assets/images/freebies/dennys.png"),

    offer: {
      title: "Free Build Your Own Grand Slam",
      description: "Choose 4 items for your breakfast",
      valueRange: {
        min: 10.0,
        max: 14.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: false,
      requiresID: true,
      advanceSignupDays: 0,
    },

    redemptionWindow: "day",
    hasMultipleLocations: true,

    instructions: [
      "Visit any Denny's location on your actual birthday",
      "Bring valid ID showing your birth date",
      "Let your server know it's your birthday",
      "Choose 4 items to build your Grand Slam breakfast",
    ],

    restrictions: [
      "Must show valid ID",
      "Valid only on your actual birthday",
      "Dine-in only",
      "One per person per birthday",
      "May vary by location",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 85,
  },
  {
    id: "jersey-mikes-birthday",
    name: "Jersey Mike's",
    description:
      "Get a free regular sub and drink during the week of your birthday",
    category: "food",
    types: ["sandwich", "subs"],
    image: require("@/assets/images/freebies/jersey-mikes.png"),

    offer: {
      title: "Free Regular Sub & 16oz Drink",
      description: "Any regular sub and 16oz soft drink",
      valueRange: {
        min: 12.0,
        max: 15.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 8,
    },

    redemptionWindow: "week",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for the Jersey Mike's Email Club",
      "Provide your birthday (must be confirmed at least 8 days before)",
      "You'll receive your birthday reward the week before your birthday",
      "Visit any Jersey Mike's location during the week of your birthday",
      "Show your email coupon to redeem",
    ],

    restrictions: [
      "Must sign up at least 8 days before birthday",
      "Email must be confirmed 8 days in advance",
      "Valid for one week before and during birthday week",
      "One reward per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 78,
  },
  {
    id: "marble-slab-birthday",
    name: "Marble Slab Creamery",
    description:
      "Sign up at least seven days before your birthday for free ice cream",
    category: "desserts",
    types: ["ice-cream"],
    image: require("@/assets/images/freebies/marble-slab.png"),

    offer: {
      title: "Free Ice Cream",
      description: "Complimentary ice cream creation",
      valueRange: {
        min: 6.0,
        max: 10.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 7,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Marble Slab's birthday club on their website",
      "Register at least 7 days before your birthday",
      "Receive your birthday coupon via email",
      "Visit any Marble Slab Creamery location during your birthday month",
      "Present coupon to redeem your free ice cream",
    ],

    restrictions: [
      "Must sign up at least 7 days before birthday",
      "Valid during birthday month",
      "One reward per person per year",
      "May require purchase at some locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 75,
  },
  {
    id: "haidilao-birthday",
    name: "HaiDiLao Hot Pot",
    description:
      "Enjoy free prime boneless beef ribs during your birthday month as a member",
    category: "food",
    types: ["hotpot", "chinese"],
    image: require("@/assets/images/freebies/haidilao.png"),

    offer: {
      title: "Free Prime Boneless Beef Ribs",
      description:
        "Complimentary premium beef ribs plate, birthday song performance, and goodie bag",
      valueRange: {
        min: 18.0,
        max: 25.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for HaiDiLao membership through their app or website",
      "Provide your birthday information",
      "Visit HaiDiLao during your birthday month",
      "Inform staff it's your birthday month",
      "Staff will sing birthday song and provide free beef ribs and goodie bag",
    ],

    restrictions: [
      "Must be a HaiDiLao member",
      "Valid during birthday month only",
      "Dine-in only",
      "One reward per person per year",
      "May require minimum party size or order",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 82,
  },
  {
    id: "new-york-fries-birthday",
    name: "New York Fries",
    description:
      "Get free regular-size fries when you sign up for their rewards program",
    category: "food",
    types: ["fast-food", "fries"],
    image: require("@/assets/images/freebies/new-york-fries.png"),

    offer: {
      title: "Free Regular Size Fries",
      description: "One order of regular fries",
      valueRange: {
        min: 5.0,
        max: 7.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for New York Fries rewards program",
      "Add your birthday to your profile",
      "Receive your birthday reward via email or app",
      "Visit any New York Fries location during your birthday month",
      "Show your reward to redeem free fries",
    ],

    restrictions: [
      "Valid for regular size only",
      "One reward per person per year",
      "Valid at participating locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 72,
  },
  {
    id: "baskin-robbins-birthday",
    name: "Baskin-Robbins",
    description: "Get a free kiddie scoop through their rewards program",
    category: "desserts",
    types: ["ice-cream"],
    image: require("@/assets/images/freebies/baskin-robbins.png"),

    offer: {
      title: "Free Kiddie Scoop",
      description: "One free kiddie scoop of ice cream",
      valueRange: {
        min: 3.0,
        max: 5.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Baskin-Robbins rewards program",
      "Add your birthday information",
      "Receive birthday reward notification",
      "Visit any Baskin-Robbins location during your birthday month",
      "Redeem for a free kiddie scoop of your choice",
    ],

    restrictions: [
      "Valid for kiddie scoop size only",
      "One per person per birthday",
      "Valid at participating locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 70,
  },
  {
    id: "711-birthday",
    name: "7-Eleven",
    description:
      "Get a free Slurpee during your birthday month through the 7Rewards app",
    category: "drinks",
    types: ["slurpee", "convenience"],
    image: require("@/assets/images/freebies/711.png"),

    offer: {
      title: "Free Slurpee",
      description: "Any size Slurpee",
      valueRange: {
        min: 2.0,
        max: 4.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Download the 7Rewards app",
      "Create an account and add your birthday",
      "Your free Slurpee reward will appear in your app during your birthday month",
      "Visit any 7-Eleven location",
      "Show the reward barcode at checkout",
    ],

    restrictions: [
      "Must be a 7Rewards member",
      "Valid during birthday month only",
      "One reward per person per year",
      "Available at participating locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 80,
  },
  {
    id: "chipotle-birthday",
    name: "Chipotle",
    description:
      "Get free chips and your choice of salsa, queso, or guac on your birthday with a minimum purchase",
    category: "food",
    types: ["mexican", "fast-casual"],
    image: require("@/assets/images/freebies/chipotle.png"),

    offer: {
      title: "Free Chips & Dip",
      description: "Chips with guac, queso blanco, or salsa",
      valueRange: {
        min: 4.0,
        max: 6.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "day",
    hasMultipleLocations: true,

    instructions: [
      "Join Chipotle Rewards through the app or website",
      "Add your birthday to your account",
      "On your birthday, your reward will appear in your account",
      "Make a minimum $5 purchase",
      "Add free chips and your choice of guac, queso blanco, or salsa",
      "Redeem at checkout",
    ],

    restrictions: [
      "Minimum $5 purchase required",
      "Valid on birthday only",
      "Choose one: guac, queso blanco, or salsa",
      "One reward per person per year",
      "Must be redeemed with qualifying purchase",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 84,
  },
  {
    id: "booster-juice-birthday",
    name: "Booster Juice",
    description:
      "Enjoy a free smoothie on your birthday through the Booster Rewards app",
    category: "drinks",
    types: ["smoothies", "juice"],
    image: require("@/assets/images/freebies/booster-juice.png"),

    offer: {
      title: "Free Smoothie",
      description: "One complimentary smoothie",
      valueRange: {
        min: 7.0,
        max: 10.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 7,
    },

    redemptionWindow: "week",
    hasMultipleLocations: true,

    instructions: [
      "Download the Booster Juice app and create an account",
      "Add your birthday at least 7 days in advance",
      "Make at least one purchase before your birthday",
      "Your birthday reward will appear in the app",
      "Valid for 7 days from your birthday",
      "Visit any Booster Juice location and scan your app to redeem",
    ],

    restrictions: [
      "Must sign up at least 7 days before birthday",
      "Valid for 7 days from birthday",
      "One reward per person per year",
      "May require previous purchase",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 76,
  },
  {
    id: "taco-bell-birthday",
    name: "Taco Bell",
    description:
      "Get a free Baja Blast Freeze through the Taco Bell Rewards app",
    category: "drinks",
    types: ["frozen-drinks", "fast-food"],
    image: require("@/assets/images/freebies/taco-bell.png"),

    offer: {
      title: "Free Baja Blast Freeze",
      description: "Complimentary Baja Blast Freeze drink",
      valueRange: {
        min: 3.0,
        max: 5.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Download the Taco Bell app and join Taco Bell Rewards",
      "Add your birthday to your profile",
      "Your birthday reward will appear in the app during your birthday month",
      "Visit any Taco Bell location",
      "Scan your app at checkout to redeem",
    ],

    restrictions: [
      "Valid during birthday month",
      "One reward per person per year",
      "Available at participating locations",
      "Must redeem through app",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 73,
  },
  {
    id: "mcdonalds-birthday",
    name: "McDonald's",
    description: "Get free medium fries through the McDonald's app",
    category: "food",
    types: ["fast-food", "fries"],
    image: require("@/assets/images/freebies/mcdonalds.png"),

    offer: {
      title: "Free Medium Fries",
      description: "One order of medium fries",
      valueRange: {
        min: 3.0,
        max: 5.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Download the McDonald's app",
      "Create an account and add your birthday",
      "Your birthday reward will appear in your app",
      "Visit any McDonald's location during your birthday month",
      "Scan your app code to redeem free medium fries",
    ],

    restrictions: [
      "Valid during birthday month",
      "Medium size only",
      "One reward per person per year",
      "Available at participating McDonald's locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 87,
  },
  {
    id: "krispy-kreme-birthday",
    name: "Krispy Kreme",
    description: "Get a free donut on your birthday",
    category: "desserts",
    types: ["donuts", "bakery"],
    image: require("@/assets/images/freebies/krispy-kreme.png"),

    offer: {
      title: "Free Donut",
      description: "One complimentary donut of your choice",
      valueRange: {
        min: 2.0,
        max: 4.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Join Krispy Kreme Rewards through their app or website",
      "Add your birthday information",
      "Receive your birthday reward notification",
      "Visit any Krispy Kreme location during your birthday month",
      "Redeem for one free donut",
    ],

    restrictions: [
      "Valid during birthday month",
      "One donut per person per year",
      "Available at participating locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 79,
  },
  {
    id: "subway-birthday",
    name: "Subway",
    description: "Get a free cookie or 6-inch sub on your birthday",
    category: "food",
    types: ["sandwich", "subs"],
    image: require("@/assets/images/freebies/subway.png"),

    offer: {
      title: "Free Cookie or 6-inch Sub",
      description: "Choice of cookie or 6-inch sub",
      valueRange: {
        min: 2.0,
        max: 8.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Subway MyWay Rewards",
      "Add your birthday to your account",
      "Receive birthday reward via app or email",
      "Visit Subway during your birthday month",
      "Redeem for free cookie or 6-inch sub",
    ],

    restrictions: [
      "Valid during birthday month",
      "One reward per person per year",
      "Available at participating locations",
      "Offer may vary by location",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 77,
  },
  {
    id: "the-alley-birthday",
    name: "The Alley",
    description: "Free drink on your birthday through their rewards app",
    category: "drinks",
    types: ["bubble-tea", "bbt"],
    image: require("@/assets/images/freebies/the-alley.png"),

    offer: {
      title: "Free Bubble Tea",
      description: "One complimentary drink",
      valueRange: {
        min: 6.0,
        max: 9.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "week",
    hasMultipleLocations: true,

    instructions: [
      "Download The Alley rewards app",
      "Create an account and add your birthday",
      "Your birthday reward will appear in the app",
      "Valid for 5 days from your birthday",
      "Visit The Alley and scan app to redeem",
    ],

    restrictions: [
      "Valid for 5 days from birthday",
      "One reward per person per year",
      "Must redeem through app",
      "Available at participating locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 81,
  },
  {
    id: "panera-bread-birthday",
    name: "Panera Bread",
    description: "Get a free pastry on your birthday as a MyPanera member",
    category: "food",
    types: ["bakery", "cafe"],
    image: require("@/assets/images/freebies/panera.png"),

    offer: {
      title: "Free Pastry",
      description: "One complimentary pastry",
      valueRange: {
        min: 3.0,
        max: 5.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Join MyPanera rewards program",
      "Add your birthday information",
      "Receive birthday reward in your account",
      "Visit Panera Bread during your birthday month",
      "Show your reward at checkout",
    ],

    restrictions: [
      "Valid during birthday month",
      "One pastry per person per year",
      "Must be a MyPanera member",
      "Available at participating locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 74,
  },
  {
    id: "wendys-birthday",
    name: "Wendy's",
    description: "Free small Frosty through the Wendy's app",
    category: "desserts",
    types: ["frozen-treats", "fast-food"],
    image: require("@/assets/images/freebies/wendys.png"),

    offer: {
      title: "Free Small Frosty",
      description: "Complimentary small Frosty",
      valueRange: {
        min: 2.0,
        max: 3.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Download Wendy's app and join Wendy's Rewards",
      "Add your birthday to your profile",
      "Birthday reward will appear in app",
      "Visit Wendy's during birthday month",
      "Scan app at checkout to redeem",
    ],

    restrictions: [
      "Valid during birthday month",
      "Small size only",
      "One reward per person per year",
      "Available at participating Wendy's locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 71,
  },
  {
    id: "boston-pizza-birthday",
    name: "Boston Pizza",
    description: "Free dessert on your birthday through MyBP rewards",
    category: "food",
    types: ["restaurant", "pizza"],
    image: require("@/assets/images/freebies/boston-pizza.png"),

    offer: {
      title: "Free Dessert",
      description: "Complimentary dessert of your choice",
      valueRange: {
        min: 7.0,
        max: 10.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Join MyBP rewards program through app or website",
      "Add your birthday information",
      "Receive birthday dessert reward",
      "Visit Boston Pizza during your birthday month",
      "Show your reward to server",
    ],

    restrictions: [
      "Valid during birthday month",
      "Dine-in only",
      "One dessert per person per year",
      "Must be a MyBP member",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 76,
  },
  {
    id: "cobs-bread-birthday",
    name: "COBS Bread",
    description: "Free treat on your birthday through the COBS app",
    category: "food",
    types: ["bakery"],
    image: require("@/assets/images/freebies/cobs.png"),

    offer: {
      title: "Free Birthday Treat",
      description: "Typically a free cinnamon bun or similar treat",
      valueRange: {
        min: 3.0,
        max: 5.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Download the COBS Bread app",
      "Sign up for COBS Club",
      "Add your birthday to your profile",
      "Receive birthday reward in app during birthday month",
      "Visit any COBS Bread location and redeem",
    ],

    restrictions: [
      "Valid during birthday month",
      "One treat per person per year",
      "Available at participating COBS locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 69,
  },

  {
    id: "second-cup-birthday",
    name: "Second Cup",
    description: "Free drink on your birthday through their loyalty program",
    category: "drinks",
    types: ["coffee", "cafe"],
    image: require("@/assets/images/freebies/second-cup.png"),

    offer: {
      title: "Free Birthday Drink",
      description: "One complimentary beverage",
      valueRange: {
        min: 5.0,
        max: 8.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "week",
    hasMultipleLocations: true,

    instructions: [
      "Join Second Cup loyalty program",
      "Add your birthday to your account",
      "Receive birthday drink reward",
      "Visit Second Cup during your birthday week",
      "Show your loyalty account to redeem",
    ],

    restrictions: [
      "Valid during birthday week",
      "One drink per person per year",
      "Must be a loyalty member",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 68,
  },

  {
    id: "jugo-juice-birthday",
    name: "Jugo Juice",
    description: "Free large smoothie on your birthday via email subscription",
    category: "drinks",
    types: ["smoothies", "juice"],
    image: require("@/assets/images/freebies/jugo-juice.png"),

    offer: {
      title: "Free Large Smoothie",
      description: "One complimentary large smoothie",
      valueRange: {
        min: 8.0,
        max: 11.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Jugo Juice email newsletter",
      "Provide your birthday during registration",
      "Receive birthday coupon via email",
      "Visit Jugo Juice during your birthday month",
      "Present coupon to redeem free large smoothie",
    ],

    restrictions: [
      "Valid during birthday month",
      "Large size only",
      "One smoothie per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 67,
  },

  {
    id: "south-st-burger-birthday",
    name: "South St. Burger",
    description: "BOGO coupon on your birthday via email",
    category: "food",
    types: ["burgers", "fast-casual"],
    image: require("@/assets/images/freebies/south-st-burger.png"),

    offer: {
      title: "BOGO Burger",
      description: "Buy one burger, get one free",
      valueRange: {
        min: 8.0,
        max: 12.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for South St. Burger email list",
      "Add your birthday information",
      "Receive BOGO coupon via email",
      "Visit South St. Burger during your birthday month",
      "Present coupon at checkout",
    ],

    restrictions: [
      "Buy one burger, get one free",
      "Valid during birthday month",
      "One coupon per person per year",
      "May not be combined with other offers",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 65,
  },

  {
    id: "menchies-birthday",
    name: "Menchie's Frozen Yogurt",
    description: "Free $5 coupon on your birthday via email",
    category: "desserts",
    types: ["frozen-yogurt", "ice-cream"],
    image: require("@/assets/images/freebies/menchies.png"),

    offer: {
      title: "Free $5 Coupon",
      description: "$5 off your purchase",
      valueRange: {
        min: 5.0,
        max: 5.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Menchie's email list",
      "Provide your birthday",
      "Receive $5 coupon via email on your birthday",
      "Visit Menchie's during your birthday month",
      "Present coupon at checkout",
    ],

    restrictions: [
      "$5 off purchase",
      "Valid during birthday month",
      "One coupon per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 66,
  },

  {
    id: "crumbl-cookies-birthday",
    name: "Crumbl Cookies",
    description:
      "Free cookie voucher when you reach Silver status in their rewards program",
    category: "desserts",
    types: ["cookies", "bakery"],
    image: require("@/assets/images/freebies/crumbl.png"),

    offer: {
      title: "Free Cookie Voucher",
      description: "One complimentary cookie",
      valueRange: {
        min: 4.0,
        max: 5.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Crumbl Rewards",
      "Reach Silver status (requires previous purchases)",
      "Add your birthday to your account",
      "Receive free cookie voucher during birthday month",
      "Visit Crumbl and redeem voucher",
    ],

    restrictions: [
      "Must have Silver status or higher",
      "Valid during birthday month",
      "One cookie per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 83,
  },

  {
    id: "ihalo-krunch-birthday",
    name: "iHalo Krunch",
    description: "Free cone when you show your ID on your birthday",
    category: "desserts",
    types: ["ice-cream", "asian-dessert"],
    image: require("@/assets/images/freebies/ihalo-krunch.png"),

    offer: {
      title: "Free Ice Cream Cone",
      description: "One complimentary cone",
      valueRange: {
        min: 5.0,
        max: 7.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: false,
      requiresID: true,
      advanceSignupDays: 0,
    },

    redemptionWindow: "day",
    hasMultipleLocations: true,

    instructions: [
      "Visit iHalo Krunch on your birthday",
      "Show valid ID with your birth date",
      "Receive your free cone",
    ],

    restrictions: [
      "Must show valid ID",
      "Valid on birthday only",
      "One cone per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 64,
  },

  {
    id: "red-lobster-birthday",
    name: "Red Lobster",
    description: "Birthday offer through their mailing list",
    category: "food",
    types: ["seafood", "restaurant"],
    image: require("@/assets/images/freebies/red-lobster.png"),

    offer: {
      title: "Birthday Offer",
      description: "Special birthday reward (varies)",
      valueRange: {
        min: 5.0,
        max: 10.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Red Lobster's email list",
      "Provide your birthday",
      "Receive birthday offer via email",
      "Visit Red Lobster during your birthday month",
      "Present email offer to server",
    ],

    restrictions: [
      "Valid during birthday month",
      "Offer may vary",
      "One reward per person per year",
      "Dine-in only",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 70,
  },

  {
    id: "marry-me-mochi-birthday",
    name: "Marry Me Mochi",
    description: "Free mochi donut when you sign up for their program",
    category: "desserts",
    types: ["donuts", "asian-dessert", "mochi"],
    image: require("@/assets/images/freebies/marry-me-mochi.png"),

    offer: {
      title: "Free Mochi Donut",
      description: "One complimentary mochi donut",
      valueRange: {
        min: 4.0,
        max: 6.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 7,
    },

    redemptionWindow: "month",
    hasMultipleLocations: false,

    instructions: [
      "Sign up for Marry Me Mochi birthday program",
      "Register at least one week before your birthday",
      "Receive birthday reward notification",
      "Visit Marry Me Mochi during birthday month",
      "Redeem for free mochi donut",
    ],

    restrictions: [
      "Must sign up one week before birthday",
      "Valid during birthday month",
      "One donut per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 72,
  },

  {
    id: "toro-toro-birthday",
    name: "Toro Toro",
    description:
      "Free 8-piece maki roll when you sign up the month before your birthday",
    category: "food",
    types: ["sushi", "japanese"],
    image: require("@/assets/images/freebies/toro-toro.png"),

    offer: {
      title: "Free 8-Piece Maki Roll",
      description: "Complimentary maki roll",
      valueRange: {
        min: 8.0,
        max: 12.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 30,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Toro Toro rewards",
      "Register at least one month before your birthday",
      "Receive birthday reward notification",
      "Visit Toro Toro during your birthday month",
      "Redeem for free 8-piece maki roll",
    ],

    restrictions: [
      "Must sign up one month in advance",
      "Valid during birthday month",
      "Dine-in only",
      "One roll per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 68,
  },

  {
    id: "afuri-birthday",
    name: "Afuri",
    description: "Enjoy free ramen on your birthday - just show your ID",
    category: "food",
    types: ["ramen", "japanese"],
    image: require("@/assets/images/freebies/afuri.png"),

    offer: {
      title: "Free Ramen",
      description: "One complimentary ramen bowl",
      valueRange: {
        min: 14.0,
        max: 18.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: false,
      requiresID: true,
      advanceSignupDays: 0,
    },

    redemptionWindow: "day",
    hasMultipleLocations: true,

    instructions: [
      "Visit Afuri on your birthday",
      "Show valid ID with birth date",
      "Receive free ramen bowl",
    ],

    restrictions: [
      "Must show valid ID",
      "Valid on birthday only",
      "Dine-in only",
      "One ramen per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 75,
  },

  {
    id: "earls-birthday",
    name: "Earls Kitchen + Bar",
    description:
      "Free dessert when you mention it's your birthday - no sign up required",
    category: "food",
    types: ["restaurant", "casual-dining"],
    image: require("@/assets/images/freebies/earls.png"),

    offer: {
      title: "Free Dessert",
      description: "Complimentary dessert of your choice",
      valueRange: {
        min: 8.0,
        max: 12.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "day",
    hasMultipleLocations: true,

    instructions: [
      "Visit Earls on your birthday",
      "Mention to your server that it's your birthday",
      "Enjoy your complimentary dessert",
    ],

    restrictions: [
      "Valid on birthday only",
      "Dine-in only",
      "One dessert per person per year",
      "No sign-up required",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 77,
  },

  {
    id: "firehouse-subs-birthday",
    name: "Firehouse Subs",
    description:
      "Free medium sub during the week of your birthday when you have an account",
    category: "food",
    types: ["sandwich", "subs"],
    image: require("@/assets/images/freebies/firehouse-subs.png"),

    offer: {
      title: "Free Medium Sub",
      description: "One complimentary medium sub",
      valueRange: {
        min: 9.0,
        max: 12.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "week",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Firehouse Subs Rewards",
      "Add your birthday to your account",
      "Receive birthday reward during your birthday week",
      "Visit Firehouse Subs",
      "Show your reward to redeem",
    ],

    restrictions: [
      "Valid during birthday week",
      "Medium size only",
      "One sub per person per year",
      "Must be a rewards member",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 71,
  },

  {
    id: "chungchun-birthday",
    name: "Chungchun Rice Hot Dog",
    description: "Free corn dog on your birthday through their app",
    category: "food",
    types: ["korean", "fast-food"],
    image: require("@/assets/images/freebies/chungchun.png"),

    offer: {
      title: "Free Corn Dog",
      description: "One complimentary Korean corn dog",
      valueRange: {
        min: 6.0,
        max: 8.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Download Chungchun app",
      "Create account and add birthday",
      "Receive birthday reward in app",
      "Visit Chungchun during birthday month",
      "Scan app to redeem free corn dog",
    ],

    restrictions: [
      "Valid during birthday month",
      "One corn dog per person per year",
      "Available at participating locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 73,
  },

  {
    id: "barburrito-birthday",
    name: "BarBurrito",
    description: "Free churro on your birthday through their rewards program",
    category: "food",
    types: ["mexican", "fast-casual"],
    image: require("@/assets/images/freebies/barburrito.png"),

    offer: {
      title: "Free Churro",
      description: "Complimentary churro",
      valueRange: {
        min: 3.0,
        max: 5.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Join BarBurrito Rewards",
      "Add your birthday to profile",
      "Receive birthday reward",
      "Visit BarBurrito during birthday month",
      "Redeem for free churro",
    ],

    restrictions: [
      "Valid during birthday month",
      "One churro per person per year",
      "Must be rewards member",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 64,
  },

  {
    id: "tenren-birthday",
    name: "Ten Ren's Tea",
    description: "Free drink on your birthday through their app",
    category: "drinks",
    types: ["bubble-tea", "tea"],
    image: require("@/assets/images/freebies/tenren.png"),

    offer: {
      title: "Free Birthday Drink",
      description: "One complimentary drink",
      valueRange: {
        min: 5.0,
        max: 8.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "week",
    hasMultipleLocations: true,

    instructions: [
      "Download Ten Ren's Tea app",
      "Create account and add birthday",
      "Receive birthday reward in app",
      "Visit Ten Ren's Tea during birthday week",
      "Show app to redeem free drink",
    ],

    restrictions: [
      "Valid during birthday week",
      "One drink per person per year",
      "Must redeem through app",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 66,
  },

  {
    id: "heytea-birthday",
    name: "HeyTea",
    description: "Birthday reward through their loyalty program",
    category: "drinks",
    types: ["bubble-tea", "tea"],
    image: require("@/assets/images/freebies/heytea.png"),

    offer: {
      title: "Birthday Reward",
      description: "Special birthday offer (varies)",
      valueRange: {
        min: 6.0,
        max: 9.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Download HeyTea app or join membership",
      "Add your birthday to account",
      "Receive birthday reward notification",
      "Visit HeyTea during birthday month",
      "Redeem through app",
    ],

    restrictions: [
      "Valid during birthday month",
      "One reward per person per year",
      "Must be a member",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 69,
  },

  {
    id: "good-earth-birthday",
    name: "Good Earth Coffeehouse",
    description: "Free drink on your birthday through their app",
    category: "drinks",
    types: ["coffee", "cafe"],
    image: require("@/assets/images/freebies/good-earth.png"),

    offer: {
      title: "Free Birthday Drink",
      description: "One complimentary beverage",
      valueRange: {
        min: 5.0,
        max: 8.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "week",
    hasMultipleLocations: true,

    instructions: [
      "Download Good Earth Coffeehouse app",
      "Join rewards program and add birthday",
      "Receive birthday drink reward",
      "Visit Good Earth during birthday week",
      "Scan app to redeem",
    ],

    restrictions: [
      "Valid during birthday week",
      "One drink per person per year",
      "Available at participating locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 63,
  },

  {
    id: "canadian-brewhouse-birthday",
    name: "Canadian Brewhouse",
    description: "Free nachos on your birthday through their app",
    category: "food",
    types: ["restaurant", "pub", "sports-bar"],
    image: require("@/assets/images/freebies/canadian-brewhouse.png"),

    offer: {
      title: "Free Nachos",
      description: "Complimentary order of nachos",
      valueRange: {
        min: 12.0,
        max: 16.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Download Canadian Brewhouse app",
      "Join rewards program and add birthday",
      "Receive birthday nachos reward",
      "Visit Canadian Brewhouse during birthday month",
      "Show app to server to redeem",
    ],

    restrictions: [
      "Valid during birthday month",
      "Dine-in only",
      "One order per person per year",
      "Must be rewards member",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 70,
  },

  {
    id: "paris-baguette-birthday",
    name: "Paris Baguette",
    description: "Free cake slice on your birthday through their app",
    category: "desserts",
    types: ["bakery", "cafe", "cake"],
    image: require("@/assets/images/freebies/paris-baguette.png"),

    offer: {
      title: "Free Cake Slice",
      description: "One complimentary slice of cake",
      valueRange: {
        min: 5.0,
        max: 7.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Download Paris Baguette app",
      "Join rewards program and add birthday",
      "Receive birthday cake reward",
      "Visit Paris Baguette during birthday month",
      "Scan app to redeem free cake slice",
    ],

    restrictions: [
      "Valid during birthday month",
      "One slice per person per year",
      "Available at participating locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 74,
  },

  {
    id: "chick-fil-a-birthday",
    name: "Chick-fil-A",
    description: "Free cookie when you show your ID on your birthday",
    category: "desserts",
    types: ["fast-food", "cookies"],
    image: require("@/assets/images/freebies/chick-fil-a.png"),

    offer: {
      title: "Free Cookie",
      description: "One complimentary cookie",
      valueRange: {
        min: 2.0,
        max: 3.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: false,
      requiresID: true,
      advanceSignupDays: 0,
    },

    redemptionWindow: "day",
    hasMultipleLocations: true,

    instructions: [
      "Visit Chick-fil-A on your birthday",
      "Show valid ID with birth date",
      "Receive free cookie",
    ],

    restrictions: [
      "Must show valid ID",
      "Valid on birthday only",
      "One cookie per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 76,
  },

  {
    id: "nutbar-birthday",
    name: "Nutbar",
    description:
      "Free smoothie on your birthday through their app (requires past purchase)",
    category: "drinks",
    types: ["smoothies", "juice", "healthy"],
    image: require("@/assets/images/freebies/nutbar.png"),

    offer: {
      title: "Free Smoothie",
      description: "One complimentary smoothie",
      valueRange: {
        min: 7.0,
        max: 10.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: false,

    instructions: [
      "Download Nutbar app",
      "Create account and make a past purchase",
      "Add your birthday to profile",
      "Receive birthday smoothie reward",
      "Visit Nutbar during birthday month",
      "Scan app to redeem",
    ],

    restrictions: [
      "Requires at least one past purchase",
      "Valid during birthday month",
      "One smoothie per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 62,
  },

  {
    id: "kettlemans-birthday",
    name: "Kettleman's Bagel Co.",
    description:
      "Free 6 bagels when you sign up at least one week before your birthday",
    category: "food",
    types: ["bagels", "bakery"],
    image: require("@/assets/images/freebies/kettlemans.png"),

    offer: {
      title: "Free 6 Bagels",
      description: "Half dozen bagels of your choice",
      valueRange: {
        min: 6.0,
        max: 8.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 7,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Kettleman's birthday club",
      "Register at least one week before birthday",
      "Receive birthday coupon via email",
      "Visit Kettleman's during birthday month",
      "Redeem for free 6 bagels",
    ],

    restrictions: [
      "Must sign up one week in advance",
      "Valid during birthday month",
      "One reward per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 68,
  },
  {
    id: "sephora-birthday",
    name: "Sephora",
    description:
      "Receive a curated mini gift set during your birthday month as a Beauty Insider member",
    category: "beauty",
    types: ["cosmetics", "skincare", "luxury"],
    image: require("@/assets/images/freebies/sephora.png"),

    offer: {
      title: "Birthday Gift Set",
      description:
        "Mini beauty gift set featuring premium brand products (options rotate annually)",
      valueRange: {
        min: 15.0,
        max: 30.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Sephora Beauty Insider (free membership)",
      "Add your birthday to your profile",
      "During your birthday month, visit any Sephora store or add to online order",
      "Choose from available birthday gift options",
      "Present membership at checkout in-store or add to cart online",
      "No purchase necessary in-store; online requires minimum purchase",
    ],

    restrictions: [
      "Valid during birthday month only",
      "Must be a Beauty Insider member (free to join)",
      "One gift per person per year",
      "In-store: no purchase necessary",
      "Online: requires minimum purchase to qualify for free shipping",
      "Gift options vary by year and availability",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 95,
  },

  {
    id: "mac-cosmetics-birthday",
    name: "MAC Cosmetics",
    description: "Free makeup goodies when you have a MAC Lover account",
    category: "makeup",
    types: ["cosmetics", "luxury"],
    image: require("@/assets/images/freebies/mac.png"),

    offer: {
      title: "Birthday Makeup Gift",
      description: "Complimentary makeup product or sample set",
      valueRange: {
        min: 10.0,
        max: 20.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for MAC Lover rewards program (free)",
      "Add your birthday to your account",
      "Receive birthday gift notification during birthday month",
      "Visit MAC store or shop online",
      "Redeem your birthday gift",
    ],

    restrictions: [
      "Valid during birthday month",
      "Must be MAC Lover member",
      "One gift per person per year",
      "No purchase necessary in-store",
      "Gift selection may vary by location",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 88,
  },

  {
    id: "kiehls-birthday",
    name: "Kiehl's",
    description: "Special birthday gift for Kiehl's Rewards members",
    category: "skincare",
    types: ["luxury", "skincare"],
    image: require("@/assets/images/freebies/kiehls.png"),

    offer: {
      title: "Birthday Skincare Gift",
      description: "Complimentary skincare product or deluxe sample",
      valueRange: {
        min: 12.0,
        max: 25.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Join Kiehl's Rewards program",
      "Add your birthday to your profile",
      "Receive birthday gift notification",
      "Visit any Kiehl's store during birthday month",
      "Claim your birthday skincare gift",
    ],

    restrictions: [
      "Valid during birthday month",
      "Must be Kiehl's Rewards member",
      "One gift per person per year",
      "Available in-store only",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 82,
  },

  {
    id: "loccitane-birthday",
    name: "L'Occitane",
    description: "Free gift with purchase during your birthday month",
    category: "beauty",
    types: ["skincare", "luxury", "fragrance"],
    image: require("@/assets/images/freebies/loccitane.png"),

    offer: {
      title: "Birthday Gift with Purchase",
      description: "Special birthday gift with any purchase",
      valueRange: {
        min: 10.0,
        max: 20.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for L'Occitane membership program",
      "Add your birthday to your account",
      "Receive birthday offer during birthday month",
      "Make any purchase at L'Occitane",
      "Receive your free birthday gift",
    ],

    restrictions: [
      "Valid during birthday month",
      "Requires any purchase",
      "Must be a member",
      "One gift per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 76,
  },

  {
    id: "body-shop-birthday",
    name: "The Body Shop",
    description: "Receive a $10 reward during your birthday month",
    category: "beauty",
    types: ["skincare", "beauty", "ethical"],
    image: require("@/assets/images/freebies/body-shop.png"),

    offer: {
      title: "$10 Birthday Reward",
      description: "$10 off your purchase",
      valueRange: {
        min: 10.0,
        max: 10.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Join The Body Shop's Love Your Body Club",
      "Add your birthday to your profile",
      "Receive $10 birthday reward during birthday month",
      "Shop in-store or online",
      "Apply reward at checkout",
    ],

    restrictions: [
      "Valid during birthday month",
      "$10 off purchase",
      "Must be Love Your Body Club member",
      "One reward per person per year",
      "May require minimum purchase",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 84,
  },

  {
    id: "fuzz-wax-bar-birthday",
    name: "Fuzz Wax Bar",
    description: "Free wax service on the house if you're a member",
    category: "beauty",
    types: ["waxing", "beauty-services"],
    image: require("@/assets/images/freebies/fuzz-wax.png"),

    offer: {
      title: "Free Wax Service",
      description: "Complimentary waxing service",
      valueRange: {
        min: 15.0,
        max: 40.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Fuzz membership",
      "Add your birthday to your profile",
      "Book an appointment during your birthday month",
      "Mention it's your birthday when booking",
      "Receive free wax service",
    ],

    restrictions: [
      "Valid during birthday month",
      "Must be a Fuzz member",
      "One free service per person per year",
      "Appointment required",
      "Service type may be limited to specific areas",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 78,
  },

  {
    id: "lindt-birthday",
    name: "Lindt",
    description:
      "Free bag of Lindor chocolates when you're on the mailing list",
    category: "food",
    types: ["chocolate", "treats"],
    image: require("@/assets/images/freebies/lindt.png"),

    offer: {
      title: "Free Lindor Bag",
      description: "Complimentary bag of Lindor chocolates",
      valueRange: {
        min: 8.0,
        max: 12.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Lindt's mailing list",
      "Provide your birthday",
      "Receive birthday coupon via email",
      "Visit any Lindt store during birthday month",
      "Redeem for free Lindor bag",
    ],

    restrictions: [
      "Valid during birthday month",
      "Must be on mailing list",
      "One bag per person per year",
      "Available at Lindt stores only",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 86,
  },

  {
    id: "sukoshi-mart-birthday",
    name: "Sukoshi Mart",
    description: "Free skincare product on your birthday",
    category: "beauty",
    types: ["k-beauty", "asian-beauty", "skincare"],
    image: require("@/assets/images/freebies/sukoshi-mart.png"),

    offer: {
      title: "Free Skincare Product",
      description: "Complimentary skincare item",
      valueRange: {
        min: 8.0,
        max: 15.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Sukoshi Mart's birthday program",
      "Add your birthday information",
      "Receive birthday notification",
      "Visit Sukoshi Mart during birthday month",
      "Claim your free skincare product",
    ],

    restrictions: [
      "Valid during birthday month",
      "One product per person per year",
      "Product selection may vary",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 71,
  },
  {
    id: "indigo-birthday",
    name: "Indigo",
    description:
      "Get 20% off your purchase as a PLUM member, plus extra bonus points if you're PLUM+",
    category: "bookstore",
    types: ["books", "lifestyle", "gifts"],
    image: require("@/assets/images/freebies/indigo.png"),

    offer: {
      title: "20% Off + Bonus Points",
      description:
        "20% off entire purchase, PLUM+ members get additional 2,500 bonus points",
      valueRange: {
        min: 5.0,
        max: 50.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Indigo PLUM Rewards (free)",
      "Add your birthday to your account",
      "During your birthday month, receive 20% off coupon",
      "Shop in-store or online",
      "Apply discount at checkout",
      "PLUM+ members automatically receive 2,500 bonus points",
    ],

    restrictions: [
      "Valid during birthday month",
      "Must be PLUM member (free to join)",
      "20% off discount applies to most items",
      "Some exclusions may apply",
      "PLUM+ members get additional 2,500 points",
      "One reward per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 89,
  },

  {
    id: "hm-birthday",
    name: "H&M",
    description: "Receive 25% off during your birthday month as an H&M member",
    category: "retail",
    types: ["fashion", "fast-fashion"],
    image: require("@/assets/images/freebies/hm.png"),

    offer: {
      title: "25% Off Birthday Discount",
      description: "25% off your purchase",
      valueRange: {
        min: 10.0,
        max: 100.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for H&M membership (free)",
      "Add your birthday to your profile",
      "Receive 25% off voucher during birthday month",
      "Shop in-store or online",
      "Apply voucher at checkout",
    ],

    restrictions: [
      "Valid during birthday month",
      "Must be H&M member",
      "25% off discount",
      "Some exclusions may apply",
      "One voucher per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 87,
  },

  {
    id: "ardene-birthday",
    name: "Ardene",
    description: "Get 20% off during your birthday month",
    category: "retail",
    types: ["fashion", "accessories", "teen"],
    image: require("@/assets/images/freebies/ardene.png"),

    offer: {
      title: "20% Off Birthday Discount",
      description: "20% off your entire purchase",
      valueRange: {
        min: 5.0,
        max: 50.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Join Ardene's A-List Rewards program",
      "Add your birthday to your account",
      "Receive 20% off birthday offer",
      "Shop in-store or online during birthday month",
      "Apply discount at checkout",
    ],

    restrictions: [
      "Valid during birthday month",
      "Must be A-List member",
      "20% off discount",
      "One reward per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 75,
  },

  {
    id: "ae-birthday",
    name: "American Eagle",
    description: "Receive a $5 voucher on your birthday",
    category: "retail",
    types: ["fashion", "casual"],
    image: require("@/assets/images/freebies/american-eagle.png"),

    offer: {
      title: "$5 Birthday Voucher",
      description: "$5 off your purchase",
      valueRange: {
        min: 5.0,
        max: 5.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for American Eagle Rewards",
      "Add your birthday to profile",
      "Receive $5 voucher during birthday month",
      "Shop in-store or online",
      "Apply voucher at checkout",
    ],

    restrictions: [
      "Valid during birthday month",
      "$5 off purchase",
      "Must be AE Rewards member",
      "May require minimum purchase",
      "One voucher per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 78,
  },

  {
    id: "aerie-birthday",
    name: "Aerie",
    description: "Get a $5 voucher during your birthday month",
    category: "retail",
    types: ["intimates", "loungewear", "fashion"],
    image: require("@/assets/images/freebies/aerie.png"),

    offer: {
      title: "$5 Birthday Voucher",
      description: "$5 off your purchase",
      valueRange: {
        min: 5.0,
        max: 5.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Join Aerie Rewards program",
      "Add your birthday",
      "Receive $5 birthday voucher",
      "Shop in-store or online during birthday month",
      "Apply voucher at checkout",
    ],

    restrictions: [
      "Valid during birthday month",
      "$5 off purchase",
      "Must be Aerie Rewards member",
      "May require minimum purchase",
      "One voucher per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 76,
  },

  {
    id: "swarovski-birthday",
    name: "Swarovski",
    description: "Enjoy 20% off during your birthday month",
    category: "beauty",
    types: ["jewelry", "luxury", "crystal"],
    image: require("@/assets/images/freebies/swarovski.png"),

    offer: {
      title: "20% Off Birthday Discount",
      description: "20% off your purchase",
      valueRange: {
        min: 20.0,
        max: 200.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Join Swarovski Club",
      "Add your birthday to your profile",
      "Receive 20% off birthday offer",
      "Shop in-store or online during birthday month",
      "Apply discount at checkout",
    ],

    restrictions: [
      "Valid during birthday month",
      "20% off purchase",
      "Must be Swarovski Club member",
      "Some exclusions may apply",
      "One reward per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 72,
  },
  {
    id: "sally-beauty-birthday",
    name: "Sally Beauty",
    description: "Get a $5 voucher on your birthday",
    category: "beauty",
    types: ["beauty-supplies", "haircare"],
    image: require("@/assets/images/freebies/sally-beauty.png"),

    offer: {
      title: "$5 Birthday Voucher",
      description: "$5 off your purchase",
      valueRange: {
        min: 5.0,
        max: 5.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Sally Beauty Rewards",
      "Add your birthday",
      "Receive $5 birthday voucher",
      "Shop in-store or online during birthday month",
      "Apply voucher at checkout",
    ],

    restrictions: [
      "Valid during birthday month",
      "$5 off purchase",
      "Must be rewards member",
      "One voucher per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 74,
  },

  {
    id: "air-canada-birthday",
    name: "Air Canada Aeroplan",
    description: "Receive 100 bonus points on your birthday",
    category: "retail",
    types: ["airline", "points"],
    image: require("@/assets/images/freebies/air-canada.png"),

    offer: {
      title: "100 Bonus Aeroplan Points",
      description: "100 points added to your account",
      valueRange: {
        min: 1.0,
        max: 2.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "day",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Air Canada Aeroplan",
      "Add your birthday to your profile",
      "Automatically receive 100 bonus points on your birthday",
      "Points will be deposited into your account",
    ],

    restrictions: [
      "Valid on birthday only",
      "100 Aeroplan points",
      "Must be Aeroplan member",
      "Points automatically deposited",
      "One reward per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 70,
  },

  {
    id: "mission-thrift-birthday",
    name: "Mission Thrift",
    description: "Receive bonus points on your birthday",
    category: "retail",
    types: ["secondhand", "thrift-store"],
    image: require("@/assets/images/freebies/mission-thrift.png"),

    offer: {
      title: "Birthday Bonus Points",
      description: "Extra loyalty points on your birthday",
      valueRange: {
        min: 5.0,
        max: 10.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "day",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Mission Thrift loyalty program",
      "Add your birthday",
      "Shop on your birthday",
      "Receive bonus points on your purchase",
    ],

    restrictions: [
      "Valid on birthday only",
      "Requires purchase to earn bonus points",
      "Must be loyalty member",
      "One reward per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 62,
  },

  {
    id: "value-village-birthday",
    name: "Value Village",
    description: "Get 20% off on your birthday",
    category: "retail",
    types: ["secondhand", "thrift-store"],
    image: require("@/assets/images/freebies/value-village.png"),

    offer: {
      title: "20% Off Birthday Discount",
      description: "20% off your entire purchase",
      valueRange: {
        min: 5.0,
        max: 50.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "day",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Value Village email list",
      "Add your birthday",
      "Receive 20% off coupon for your birthday",
      "Shop at Value Village on your birthday",
      "Present coupon at checkout",
    ],

    restrictions: [
      "Valid on birthday only",
      "20% off discount",
      "Must show coupon",
      "Some exclusions may apply",
      "One coupon per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 73,
  },

  {
    id: "pet-valu-birthday",
    name: "Pet Valu",
    description: "Special birthday offer for your pet",
    category: "retail",
    types: ["pet-supplies", "pet-food"],
    image: require("@/assets/images/freebies/pet-valu.png"),

    offer: {
      title: "Pet Birthday Offer",
      description: "Special birthday discount or treat for your pet",
      valueRange: {
        min: 5.0,
        max: 15.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Join Pet Valu Rewards program",
      "Add your pet's birthday",
      "Receive pet birthday offer during their birthday month",
      "Visit Pet Valu to redeem",
      "Get special discount or free treat for your pet",
    ],

    restrictions: [
      "Valid during pet's birthday month",
      "Must be Pet Valu Rewards member",
      "Offer varies by location",
      "One reward per pet per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 79,
  },

  {
    id: "petsmart-birthday",
    name: "PetSmart",
    description: "Birthday pet coupon or treat for your furry friend",
    category: "retail",
    types: ["pet-supplies", "pet-services"],
    image: require("@/assets/images/freebies/petsmart.png"),

    offer: {
      title: "Pet Birthday Treat/Coupon",
      description: "Free treat or discount coupon for your pet",
      valueRange: {
        min: 3.0,
        max: 10.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for PetSmart Treats Rewards",
      "Add your pet's birthday",
      "Receive pet birthday offer during birthday month",
      "Visit PetSmart store",
      "Redeem for free treat or coupon",
    ],

    restrictions: [
      "Valid during pet's birthday month",
      "Must be Treats Rewards member",
      "One reward per pet per year",
      "In-store redemption only",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 81,
  },

  {
    id: "build-a-bear-birthday",
    name: "Build-A-Bear",
    description: "Pay your age for a birthday bear (age restrictions apply)",
    category: "entertainment",
    types: ["toys", "gifts", "experience"],
    image: require("@/assets/images/freebies/build-a-bear.png"),

    offer: {
      title: "Pay-Your-Age Birthday Bear",
      description: "Create a birthday bear for the price of your age",
      valueRange: {
        min: 1.0,
        max: 14.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: false,
      requiresID: true,
      advanceSignupDays: 7,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Join Build-A-Bear Bonus Club at least 7 days before birthday",
      "Add birthday to your account",
      "Receive pay-your-age offer (typically for ages 1-14)",
      "Visit Build-A-Bear during birthday month",
      "Create a special birthday bear for the price of your age",
      "Offer may be subject to specific dates/terms each year",
    ],

    restrictions: [
      "Must sign up at least 7 days before birthday",
      "Typically valid for ages 1-14 (verify current year's terms)",
      "Valid during birthday month on specific dates",
      "In-store only",
      "Limited to Count Your Candles bear or specific selection",
      "One bear per person per year",
      "Terms and eligible ages may vary by promotion year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 85,
  },

  {
    id: "nothing-bundt-cakes-birthday",
    name: "Nothing Bundt Cakes",
    description: "Free Bundtlet cake on your birthday when you have an account",
    category: "desserts",
    types: ["bakery", "cake", "treats"],
    image: require("@/assets/images/freebies/nothing-bundt-cakes.png"),

    offer: {
      title: "Free Bundtlet",
      description: "One complimentary Bundtlet cake",
      valueRange: {
        min: 4.0,
        max: 6.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for MyBundt Rewards",
      "Add your birthday to account",
      "Receive free Bundtlet voucher during birthday month",
      "Visit Nothing Bundt Cakes",
      "Redeem for free Bundtlet",
    ],

    restrictions: [
      "Valid during birthday month",
      "Must be MyBundt Rewards member",
      "One Bundtlet per person per year",
      "In-store redemption only",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-20"),
    popularity: 77,
  },
  {
    id: "harveys-birthday",
    name: "Harvey's",
    description: "Get a free pie when you sign up for the Burger Boss Club",
    category: "food",
    types: ["burgers", "fast-food"],
    image: require("@/assets/images/freebies/harveys.png"),

    offer: {
      title: "Free Pie",
      description: "Complimentary Harvey's pie (typically apple or cherry)",
      valueRange: {
        min: 3.0,
        max: 5.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Harvey's Burger Boss Club via their website",
      "Provide your birthday during registration",
      "Receive a free pie e-coupon during your birthday month via email",
      "Visit any Harvey's location during your birthday month",
      "Present email coupon to redeem your free pie",
    ],

    restrictions: [
      "Valid during birthday month",
      "One pie per person per year",
      "Must be Burger Boss Club member",
      "Available at participating locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 67,
  },

  {
    id: "swiss-chalet-birthday",
    name: "Swiss Chalet",
    description:
      "Get a free dessert on your birthday through the Rotisserie Mail program",
    category: "food",
    types: ["rotisserie", "chicken", "canadian"],
    image: require("@/assets/images/freebies/swiss-chalet.png"),

    offer: {
      title: "Free Birthday Dessert",
      description: "Complimentary slice of pie, cake, or sundae",
      valueRange: {
        min: 6.0,
        max: 9.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Swiss Chalet's Rotisserie Mail newsletter",
      "Add your birthday to your profile",
      "Receive birthday treat notification during birthday month",
      "Visit Swiss Chalet and inform your server it's your birthday",
      "Choose from available desserts (pie, cake, or sundae)",
    ],

    restrictions: [
      "Valid during birthday month",
      "Dine-in only (not valid for takeout)",
      "Must be Rotisserie Mail subscriber",
      "One dessert per person per year",
      "Available at participating locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 73,
  },

  {
    id: "the-keg-birthday",
    name: "The Keg Steakhouse + Bar",
    description:
      "Free Billy Miner Pie dessert when you mention it's your birthday",
    category: "food",
    types: ["steakhouse", "fine-dining"],
    image: require("@/assets/images/freebies/the-keg.png"),

    offer: {
      title: "Free Billy Miner Pie",
      description:
        "Complimentary slice of the famous Billy Miner Pie (mocha ice cream dessert)",
      valueRange: {
        min: 8.0,
        max: 12.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: false,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "day",
    hasMultipleLocations: true,

    instructions: [
      "Visit The Keg on your birthday",
      "Inform your server that you're celebrating your birthday",
      "Receive complimentary Billy Miner Pie dessert",
      "No signup required - just mention it's your birthday",
    ],

    restrictions: [
      "Valid on birthday only",
      "Dine-in only",
      "Offer not consistent across all locations (franchised)",
      "Server discretion - typically offered but not guaranteed",
      "One dessert per person per birthday",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 79,
  },

  {
    id: "mr-puffs-birthday",
    name: "Mr. Puffs",
    description:
      "6 free puffs on your birthday through the Puffs Points rewards program",
    category: "desserts",
    types: ["donuts", "fried-dough", "dessert-bar"],
    image: require("@/assets/images/freebies/mr-puffs.png"),

    offer: {
      title: "Free 6 Puffs",
      description: "Six complimentary puffs with your choice of glaze",
      valueRange: {
        min: 5.0,
        max: 7.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "day",
    hasMultipleLocations: true,

    instructions: [
      "Download the Mr. Puffs app from App Store or Google Play",
      "Create a Puffs Points account",
      "Complete your profile including your birthday",
      "On your birthday, receive an email confirming the reward is in your account",
      "Visit any Mr. Puffs location on your birthday",
      "Scan your app barcode to redeem 6 free puffs",
    ],

    restrictions: [
      "Valid on birthday only",
      "Must have Puffs Points account",
      "Reward expires at end of birthday",
      "One reward per person per year",
      "Must redeem through app",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 70,
  },

  {
    id: "burgers-priest-birthday",
    name: "The Burger's Priest",
    description:
      "Free cheeseburger plus a special birthday treat when you join The Congregation",
    category: "food",
    types: ["burgers", "fast-food"],
    image: require("@/assets/images/freebies/burgers-priest.png"),

    offer: {
      title: "Free Cheeseburger + Birthday Treat",
      description: "Complimentary cheeseburger and special birthday surprise",
      valueRange: {
        min: 7.0,
        max: 10.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for The Congregation loyalty program",
      "Provide your birthday during registration",
      "Receive birthday reward notification during birthday month",
      "Visit The Burger's Priest",
      "Redeem for free cheeseburger and birthday treat",
    ],

    restrictions: [
      "Valid during birthday month",
      "One reward per person per year",
      "Must be Congregation member",
      "Available at participating locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 75,
  },

  {
    id: "coras-birthday",
    name: "Cora's Breakfast & Lunch",
    description: "Triple points on your birthday purchase",
    category: "food",
    types: ["breakfast", "brunch", "canadian"],
    image: require("@/assets/images/freebies/coras.png"),

    offer: {
      title: "Triple Loyalty Points",
      description: "Earn 3x points on your birthday meal",
      valueRange: {
        min: 5.0,
        max: 15.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "day",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Cora's loyalty program",
      "Add your birthday to your account",
      "Visit Cora's on your birthday",
      "Inform staff it's your birthday",
      "Make a purchase and earn triple loyalty points",
    ],

    restrictions: [
      "Valid on birthday only",
      "Must make a purchase to earn points",
      "Dine-in only",
      "Must be loyalty member",
      "One bonus per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 65,
  },

  {
    id: "east-side-marios-birthday",
    name: "East Side Mario's",
    description: "Free dessert on your birthday",
    category: "food",
    types: ["italian", "casual-dining"],
    image: require("@/assets/images/freebies/east-side-marios.png"),

    offer: {
      title: "Free Birthday Dessert",
      description: "Complimentary dessert of your choice",
      valueRange: {
        min: 7.0,
        max: 10.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for East Side Mario's email list",
      "Provide your birthday",
      "Receive birthday dessert offer via email",
      "Visit East Side Mario's during birthday month",
      "Show offer to server to redeem dessert",
    ],

    restrictions: [
      "Valid during birthday month",
      "Dine-in only",
      "One dessert per person per year",
      "Must show email offer",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 68,
  },

  {
    id: "great-canadian-bagel-birthday",
    name: "Great Canadian Bagel",
    description: "6 free bagels on your birthday",
    category: "food",
    types: ["bagels", "bakery", "breakfast"],
    image: require("@/assets/images/freebies/great-canadian-bagel.png"),

    offer: {
      title: "Free 6 Bagels",
      description: "Half dozen bagels of your choice",
      valueRange: {
        min: 6.0,
        max: 9.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for Great Canadian Bagel's birthday club",
      "Add your birthday information",
      "Receive birthday coupon via email",
      "Visit Great Canadian Bagel during birthday month",
      "Redeem for 6 free bagels",
    ],

    restrictions: [
      "Valid during birthday month",
      "One reward per person per year",
      "Available at participating locations",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 64,
  },

  {
    id: "applebees-birthday",
    name: "Applebee's",
    description: "Free dessert on your birthday with Club Applebee's",
    category: "food",
    types: ["american", "casual-dining", "grill"],
    image: require("@/assets/images/freebies/applebees.png"),

    offer: {
      title: "Free Birthday Dessert",
      description:
        "Complimentary dessert (typically with $15 minimum purchase)",
      valueRange: {
        min: 6.0,
        max: 9.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Join Club Applebee's loyalty program",
      "Add your birthday to your profile",
      "Receive birthday dessert offer",
      "Visit Applebee's during birthday month",
      "Show offer to server",
    ],

    restrictions: [
      "Valid during birthday month",
      "Dine-in only",
      "Minimum purchase of $15 may be required",
      "One dessert per person per year",
      "Must be Club Applebee's member",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 72,
  },

  {
    id: "lone-star-grill-birthday",
    name: "Lone Star Texas Grill",
    description: "Free dessert on your birthday through The Sizzle program",
    category: "food",
    types: ["tex-mex", "grill", "casual-dining"],
    image: require("@/assets/images/freebies/lone-star.png"),

    offer: {
      title: "Free Birthday Dessert",
      description:
        "Complimentary dessert (with previous $30 spend requirement)",
      valueRange: {
        min: 7.0,
        max: 10.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: true,

    instructions: [
      "Sign up for The Sizzle email program",
      "Provide your birthday",
      "Ensure you've spent at least $30 at Lone Star previously",
      "Receive birthday dessert offer via email",
      "Visit Lone Star during birthday month",
      "Show offer to server",
    ],

    restrictions: [
      "Valid during birthday month",
      "Must have spent at least $30 previously",
      "Dine-in only",
      "One dessert per person per year",
      "Must be The Sizzle member",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 66,
  },

  {
    id: "wok-of-fame-birthday",
    name: "Wok of Fame",
    description:
      "Free buffet meal when you dine with paying guests on your birthday",
    category: "food",
    types: ["buffet", "chinese", "asian"],
    image: require("@/assets/images/freebies/wok-of-fame.png"),

    offer: {
      title: "Free Birthday Buffet",
      description: "Complimentary buffet meal for birthday person",
      valueRange: {
        min: 15.0,
        max: 25.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: false,
      requiresID: true,
      advanceSignupDays: 0,
    },

    redemptionWindow: "day",
    hasMultipleLocations: false,

    instructions: [
      "Visit Wok of Fame on your birthday with guests",
      "Bring valid ID showing your birth date",
      "Must dine with paying guests",
      "Show ID to staff",
      "Your buffet meal is complimentary",
    ],

    restrictions: [
      "Must show valid ID",
      "Valid on birthday only",
      "Must dine with paying guests (typically 2-3 minimum)",
      "Birthday person eats free",
      "One free buffet per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 67,
  },

  {
    id: "poulet-rouge-birthday",
    name: "PouletRouge",
    description: "Birthday reward through their mobile app",
    category: "food",
    types: ["chicken", "portuguese", "fast-casual"],
    image: require("@/assets/images/freebies/poulet-rouge.png"),

    offer: {
      title: "Birthday Reward",
      description:
        "Special birthday offer varies (typically discount or free item)",
      valueRange: {
        min: 5.0,
        max: 10.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: false,

    instructions: [
      "Download the PouletRouge app",
      "Create an account and add your birthday",
      "Receive birthday reward notification in app",
      "Visit PouletRouge during birthday month",
      "Scan app to redeem reward",
    ],

    restrictions: [
      "Valid during birthday month",
      "Must redeem through app",
      "One reward per person per year",
      "Offer may vary",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 61,
  },

  {
    id: "impakt-kitchen-birthday",
    name: "Impakt Kitchen",
    description: "Free smoothie on your birthday through their loyalty program",
    category: "drinks",
    types: ["smoothies", "healthy", "juice-bar"],
    image: require("@/assets/images/freebies/impakt-kitchen.png"),

    offer: {
      title: "Free Birthday Smoothie",
      description: "Complimentary smoothie of your choice",
      valueRange: {
        min: 7.0,
        max: 10.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: false,

    instructions: [
      "Sign up for Impakt Kitchen's loyalty program",
      "Add your birthday to your account",
      "Receive birthday smoothie reward",
      "Visit Impakt Kitchen during birthday month",
      "Redeem for free smoothie",
    ],

    restrictions: [
      "Valid during birthday month",
      "Must be loyalty member",
      "One smoothie per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 60,
  },

  {
    id: "brasa-peruvian-birthday",
    name: "Brasa Peruvian Grill",
    description: "Free chicken bowl, salad, or smoothie through their app",
    category: "food",
    types: ["peruvian", "healthy", "fast-casual", "latin"],
    image: require("@/assets/images/freebies/brasa.png"),

    offer: {
      title: "Free Bowl, Salad, or Smoothie",
      description: "Choice of chicken bowl, salad, or smoothie",
      valueRange: {
        min: 8.0,
        max: 12.0,
      },
    },

    requirements: {
      requiresApp: true,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: false,

    instructions: [
      "Download the Brasa app",
      "Join rewards program and add birthday",
      "Receive birthday reward in app",
      "Visit Brasa during birthday month",
      "Choose free bowl, salad, or smoothie",
      "Scan app to redeem",
    ],

    restrictions: [
      "Valid during birthday month",
      "Choose one item only",
      "Must redeem through app",
      "One reward per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 63,
  },

  {
    id: "wetzels-pretzels-birthday",
    name: "Wetzel's Pretzels",
    description: "Free pretzel when you show your ID on your birthday",
    category: "food",
    types: ["pretzels", "snacks", "fast-food"],
    image: require("@/assets/images/freebies/wetzels-pretzels.png"),

    offer: {
      title: "Free Pretzel",
      description: "One complimentary pretzel",
      valueRange: {
        min: 4.0,
        max: 6.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: false,
      requiresID: true,
      advanceSignupDays: 0,
    },

    redemptionWindow: "day",
    hasMultipleLocations: true,

    instructions: [
      "Visit Wetzel's Pretzels on your birthday",
      "Bring valid ID showing your birth date",
      "Show ID to staff",
      "Receive your free pretzel",
    ],

    restrictions: [
      "Must show valid ID",
      "Valid on birthday only",
      "One pretzel per person per year",
      "No signup required",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 65,
  },

  {
    id: "night-baker-birthday",
    name: "Night Baker",
    description:
      "Free cookie when you sign up at least one week before your birthday",
    category: "desserts",
    types: ["cookies", "bakery"],
    image: require("@/assets/images/freebies/night-baker.png"),

    offer: {
      title: "Free Cookie",
      description: "One complimentary cookie",
      valueRange: {
        min: 3.0,
        max: 5.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 7,
    },

    redemptionWindow: "month",
    hasMultipleLocations: false,

    instructions: [
      "Sign up for Night Baker's birthday program",
      "Register at least one week before your birthday",
      "Receive birthday cookie coupon via email",
      "Visit Night Baker during birthday month",
      "Redeem for free cookie",
    ],

    restrictions: [
      "Must sign up at least one week in advance",
      "Valid during birthday month",
      "One cookie per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 61,
  },

  {
    id: "cong-caphe-birthday",
    name: "Cong Caphe",
    description: "Free drink on your birthday",
    category: "drinks",
    types: ["coffee", "vietnamese-coffee", "cafe"],
    image: require("@/assets/images/freebies/cong-caphe.png"),

    offer: {
      title: "Free Vietnamese Coffee",
      description: "One complimentary drink",
      valueRange: {
        min: 5.0,
        max: 8.0,
      },
    },

    requirements: {
      requiresApp: false,
      requiresEmail: true,
      requiresID: false,
      advanceSignupDays: 0,
    },

    redemptionWindow: "month",
    hasMultipleLocations: false,

    instructions: [
      "Sign up for Cong Caphe's birthday program",
      "Add your birthday information",
      "Receive birthday drink notification",
      "Visit Cong Caphe during birthday month",
      "Redeem for free drink",
    ],

    restrictions: [
      "Valid during birthday month",
      "One drink per person per year",
    ],

    isActive: true,
    verified: true,
    lastVerified: new Date("2025-01-21"),
    popularity: 60,
  },
];
