import type { CategoryId } from "@/data/categories";
import zustandStorage from "@/utils/zustandStorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type RedemptionWindow = "day" | "week" | "month";
export type SortOption = "popularity" | "name" | "recent" | "deadline";

export interface FilterState {
  // Search
  searchQuery: string;

  // Category filter
  selectedCategories: CategoryId[];

  // Redemption window filter
  selectedRedemptionWindows: RedemptionWindow[];

  // Requirements filter
  requirementsFilter: {
    noAppRequired: boolean;
    noEmailRequired: boolean;
    easyOnly: boolean; // no app + no advance signup
  };

  // Sort
  sortBy: SortOption;

  // Active filter count (for badge)
  activeFilterCount: number;
}

interface FilterActions {
  // Search
  setSearchQuery: (query: string) => void;

  // Categories
  toggleCategory: (category: CategoryId) => void;
  clearCategories: () => void;

  // Redemption windows
  toggleRedemptionWindow: (window: RedemptionWindow) => void;
  clearRedemptionWindows: () => void;

  // Requirements
  toggleRequirement: (
    requirement: keyof FilterState["requirementsFilter"],
  ) => void;
  clearRequirements: () => void;

  // Sort
  setSortBy: (sort: SortOption) => void;

  // Reset all
  resetFilters: () => void;

  // Apply (for closing modal)
  applyFilters: () => void;
}

type FilterStore = FilterState & FilterActions;

const defaultState: FilterState = {
  searchQuery: "",
  selectedCategories: [],
  selectedRedemptionWindows: [],
  requirementsFilter: {
    noAppRequired: false,
    noEmailRequired: false,
    easyOnly: false,
  },
  sortBy: "popularity",
  activeFilterCount: 0,
};

const calculateActiveFilters = (state: FilterState): number => {
  let count = 0;
  if (state.selectedCategories.length > 0) count++;
  if (state.selectedRedemptionWindows.length > 0) count++;
  if (state.requirementsFilter.noAppRequired) count++;
  if (state.requirementsFilter.noEmailRequired) count++;
  if (state.requirementsFilter.easyOnly) count++;
  return count;
};

export const useFilterStore = create<FilterStore>()(
  persist(
    (set, get) => ({
      ...defaultState,

      setSearchQuery: (query: string) => set({ searchQuery: query }),

      toggleCategory: (category: CategoryId) =>
        set((state) => {
          const selected = state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category];
          return {
            selectedCategories: selected,
            activeFilterCount: calculateActiveFilters({
              ...state,
              selectedCategories: selected,
            }),
          };
        }),

      clearCategories: () =>
        set((state) => ({
          selectedCategories: [],
          activeFilterCount: calculateActiveFilters({
            ...state,
            selectedCategories: [],
          }),
        })),

      toggleRedemptionWindow: (window: RedemptionWindow) =>
        set((state) => {
          const selected = state.selectedRedemptionWindows.includes(window)
            ? state.selectedRedemptionWindows.filter((w) => w !== window)
            : [...state.selectedRedemptionWindows, window];
          return {
            selectedRedemptionWindows: selected,
            activeFilterCount: calculateActiveFilters({
              ...state,
              selectedRedemptionWindows: selected,
            }),
          };
        }),

      clearRedemptionWindows: () =>
        set((state) => ({
          selectedRedemptionWindows: [],
          activeFilterCount: calculateActiveFilters({
            ...state,
            selectedRedemptionWindows: [],
          }),
        })),

      toggleRequirement: (
        requirement: keyof FilterState["requirementsFilter"],
      ) =>
        set((state) => {
          const newRequirements = {
            ...state.requirementsFilter,
            [requirement]: !state.requirementsFilter[requirement],
          };
          return {
            requirementsFilter: newRequirements,
            activeFilterCount: calculateActiveFilters({
              ...state,
              requirementsFilter: newRequirements,
            }),
          };
        }),

      clearRequirements: () =>
        set((state) => ({
          requirementsFilter: {
            noAppRequired: false,
            noEmailRequired: false,
            easyOnly: false,
          },
          activeFilterCount: calculateActiveFilters({
            ...state,
            requirementsFilter: {
              noAppRequired: false,
              noEmailRequired: false,
              easyOnly: false,
            },
          }),
        })),

      setSortBy: (sort: SortOption) => set({ sortBy: sort }),

      resetFilters: () =>
        set({
          ...defaultState,
        }),

      applyFilters: () => {
        // This is called when the filter modal is closed
        // State is already updated, this is just for side effects if needed
      },
    }),
    {
      name: "filter-state",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
