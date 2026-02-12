import { restaurants } from "@/data/businesses";
import { useFilterStore } from "@/hooks/useFilterStore";
import { useMemo } from "react";

export const useFilteredRestaurants = () => {
  const {
    searchQuery,
    selectedCategories,
    selectedRedemptionWindows,
    requirementsFilter,
    sortBy,
  } = useFilterStore();

  const filteredAndSorted = useMemo(() => {
    let results = [...restaurants];

    // 1. Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.types.some((t) => t.toLowerCase().includes(query)) ||
          r.offer.title.toLowerCase().includes(query),
      );
    }

    // 2. Filter by categories
    if (selectedCategories.length > 0) {
      results = results.filter((r) => selectedCategories.includes(r.category));
    }

    // 3. Filter by redemption windows
    if (selectedRedemptionWindows.length > 0) {
      results = results.filter((r) =>
        selectedRedemptionWindows.includes(r.redemptionWindow),
      );
    }

    // 4. Filter by requirements
    if (requirementsFilter.noAppRequired) {
      results = results.filter((r) => !r.requirements.requiresApp);
    }
    if (requirementsFilter.noEmailRequired) {
      results = results.filter((r) => !r.requirements.requiresEmail);
    }
    if (requirementsFilter.easyOnly) {
      results = results.filter(
        (r) =>
          !r.requirements.requiresApp && r.requirements.advanceSignupDays === 0,
      );
    }

    // 5. Sort
    switch (sortBy) {
      case "popularity":
        results.sort((a, b) => b.popularity - a.popularity);
        break;
      case "name":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "recent":
        // Sort by lastVerified date if available, otherwise by id
        results.sort((a, b) => {
          if (!a.lastVerified || !b.lastVerified) return 0;
          return (
            new Date(b.lastVerified).getTime() -
            new Date(a.lastVerified).getTime()
          );
        });
        break;
      case "deadline":
        // Sort by advance signup days (closest first)
        results.sort(
          (a, b) =>
            a.requirements.advanceSignupDays - b.requirements.advanceSignupDays,
        );
        break;
    }

    return results;
  }, [
    searchQuery,
    selectedCategories,
    selectedRedemptionWindows,
    requirementsFilter,
    sortBy,
  ]);

  return {
    restaurants: filteredAndSorted,
    hasActiveFilters:
      searchQuery.trim() !== "" ||
      selectedCategories.length > 0 ||
      selectedRedemptionWindows.length > 0 ||
      requirementsFilter.noAppRequired ||
      requirementsFilter.noEmailRequired ||
      requirementsFilter.easyOnly,
    resultCount: filteredAndSorted.length,
    totalCount: restaurants.length,
  };
};
