import type { RestaurantMarker } from "@/data/business_marker";
import { restaurantMarkers } from "@/data/business_marker";
import type { Restaurant } from "@/data/businesses";
import { restaurants } from "@/data/businesses";
import type { CategoryId } from "@/data/categories";

export const restaurantService = {
  /**
   * Get all restaurants
   */
  getAll: async (): Promise<Restaurant[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch('/api/restaurants').then(res => res.json());
    return Promise.resolve(restaurants);
  },

  /**
   * Get a single restaurant by ID
   */
  getById: async (id: string): Promise<Restaurant | undefined> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/restaurants/${id}`).then(res => res.json());
    return Promise.resolve(restaurants.find((r) => r.id === id));
  },

  /**
   * Get all restaurant markers for map display
   */
  getMarkers: async (): Promise<RestaurantMarker[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch('/api/restaurants/markers').then(res => res.json());
    return Promise.resolve(restaurantMarkers);
  },

  /**
   * Search restaurants by query
   */
  search: async (query: string): Promise<Restaurant[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/restaurants/search?q=${query}`).then(res => res.json());
    const lowerQuery = query.toLowerCase();
    return Promise.resolve(
      restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(lowerQuery) ||
          r.description.toLowerCase().includes(lowerQuery) ||
          r.types.some((t) => t.toLowerCase().includes(lowerQuery)),
      ),
    );
  },

  /**
   * Filter restaurants by category
   */
  filterByCategory: async (category: CategoryId): Promise<Restaurant[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/restaurants?cuisine=${cuisine}`).then(res => res.json());
    return Promise.resolve(restaurants.filter((r) => r.category === category));
  },

  /**
   * Filter freebies by type (coffee, bbt, burgers, etc.)
   */
  filterByType: async (type: string): Promise<Restaurant[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/freebies?type=${type}`).then(res => res.json());
    return Promise.resolve(restaurants.filter((r) => r.types.includes(type)));
  },

  /**
   * Get freebies by redemption window
   */
  filterByRedemptionWindow: async (
    window: "day" | "week" | "month",
  ): Promise<Restaurant[]> => {
    return Promise.resolve(
      restaurants.filter((r) => r.redemptionWindow === window),
    );
  },

  /**
   * Get "easy" freebies (no app required, no advance signup)
   */
  getEasyFreebies: async (): Promise<Restaurant[]> => {
    return Promise.resolve(
      restaurants.filter(
        (r) =>
          !r.requirements.requiresApp && r.requirements.advanceSignupDays === 0,
      ),
    );
  },

  /**
   * Get freebies sorted by popularity
   */
  getPopular: async (): Promise<Restaurant[]> => {
    return Promise.resolve(
      [...restaurants].sort((a, b) => b.popularity - a.popularity),
    );
  },
};
