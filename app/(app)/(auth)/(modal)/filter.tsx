import { Colors, Fonts } from "@/constants/theme";
import type { CategoryId } from "@/data/categories";
import { categories } from "@/data/categories";
import type { RedemptionWindow, SortOption } from "@/hooks/useFilterStore";
import { useFilterStore } from "@/hooks/useFilterStore";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FilterModal = () => {
  const router = useRouter();
  const {
    selectedCategories,
    selectedRedemptionWindows,
    requirementsFilter,
    sortBy,
    toggleCategory,
    toggleRedemptionWindow,
    toggleRequirement,
    setSortBy,
    resetFilters,
    applyFilters,
    activeFilterCount,
  } = useFilterStore();

  const handleApply = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    applyFilters();
    router.dismiss();
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    resetFilters();
  };

  const handleToggleCategory = (category: CategoryId) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleCategory(category);
  };

  const handleToggleWindow = (window: RedemptionWindow) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleRedemptionWindow(window);
  };

  const handleToggleRequirement = (req: keyof typeof requirementsFilter) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleRequirement(req);
  };

  const handleSetSort = (sort: SortOption) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSortBy(sort);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filter</Text>
        {activeFilterCount > 0 && (
          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <Text style={styles.resetText}>Reset All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CATEGORY</Text>
          <View style={styles.chipContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.chip,
                  selectedCategories.includes(cat.id as CategoryId) &&
                    styles.chipSelected,
                ]}
                onPress={() => handleToggleCategory(cat.id as CategoryId)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedCategories.includes(cat.id as CategoryId) &&
                      styles.chipTextSelected,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Redemption Window */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>REDEMPTION WINDOW</Text>
          <View style={styles.chipContainer}>
            <TouchableOpacity
              style={[
                styles.chip,
                selectedRedemptionWindows.includes("day") &&
                  styles.chipSelected,
              ]}
              onPress={() => handleToggleWindow("day")}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedRedemptionWindows.includes("day") &&
                    styles.chipTextSelected,
                ]}
              >
                Birthday Day Only
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chip,
                selectedRedemptionWindows.includes("week") &&
                  styles.chipSelected,
              ]}
              onPress={() => handleToggleWindow("week")}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedRedemptionWindows.includes("week") &&
                    styles.chipTextSelected,
                ]}
              >
                Birthday Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chip,
                selectedRedemptionWindows.includes("month") &&
                  styles.chipSelected,
              ]}
              onPress={() => handleToggleWindow("month")}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedRedemptionWindows.includes("month") &&
                    styles.chipTextSelected,
                ]}
              >
                Entire Month
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>REQUIREMENTS</Text>
          <View style={styles.chipContainer}>
            <TouchableOpacity
              style={[
                styles.chip,
                requirementsFilter.easyOnly && styles.chipSelected,
              ]}
              onPress={() => handleToggleRequirement("easyOnly")}
            >
              <Text
                style={[
                  styles.chipText,
                  requirementsFilter.easyOnly && styles.chipTextSelected,
                ]}
              >
                Easy Only
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chip,
                requirementsFilter.noAppRequired && styles.chipSelected,
              ]}
              onPress={() => handleToggleRequirement("noAppRequired")}
            >
              <Text
                style={[
                  styles.chipText,
                  requirementsFilter.noAppRequired && styles.chipTextSelected,
                ]}
              >
                No App Required
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chip,
                requirementsFilter.noEmailRequired && styles.chipSelected,
              ]}
              onPress={() => handleToggleRequirement("noEmailRequired")}
            >
              <Text
                style={[
                  styles.chipText,
                  requirementsFilter.noEmailRequired && styles.chipTextSelected,
                ]}
              >
                No Email Required
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sort By */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SORT BY</Text>
          <View style={styles.chipContainer}>
            <TouchableOpacity
              style={[
                styles.chip,
                sortBy === "popularity" && styles.chipSelected,
              ]}
              onPress={() => handleSetSort("popularity")}
            >
              <Text
                style={[
                  styles.chipText,
                  sortBy === "popularity" && styles.chipTextSelected,
                ]}
              >
                Most Popular
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chip, sortBy === "name" && styles.chipSelected]}
              onPress={() => handleSetSort("name")}
            >
              <Text
                style={[
                  styles.chipText,
                  sortBy === "name" && styles.chipTextSelected,
                ]}
              >
                A to Z
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chip, sortBy === "recent" && styles.chipSelected]}
              onPress={() => handleSetSort("recent")}
            >
              <Text
                style={[
                  styles.chipText,
                  sortBy === "recent" && styles.chipTextSelected,
                ]}
              >
                Recently Added
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chip,
                sortBy === "deadline" && styles.chipSelected,
              ]}
              onPress={() => handleSetSort("deadline")}
            >
              <Text
                style={[
                  styles.chipText,
                  sortBy === "deadline" && styles.chipTextSelected,
                ]}
              >
                Advance Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Apply Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>
            Apply{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 32,
    fontWeight: "900",
  },
  resetButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.light,
  },
  resetText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.dark,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.muted,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.light,
  },
  chipSelected: {
    backgroundColor: Colors.secondary,
  },
  chipText: {
    fontSize: 14,
    color: Colors.dark,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  footer: {
    padding: 20,
    paddingBottom: 32,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.light,
  },
  applyButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default FilterModal;
