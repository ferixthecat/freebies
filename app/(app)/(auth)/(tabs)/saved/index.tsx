import { Colors, Fonts } from "@/constants/theme";
import { useSavedFreebiesStore } from "@/hooks/use-savedfreebies";
import { useRestaurants } from "@/hooks/useBusinesses";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeOutLeft } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SortOption = "redemption" | "name" | "deadline";

const SavedScreen = () => {
  const insets = useSafeAreaInsets();
  const [sortBy, setSortBy] = useState<SortOption>("redemption");
  const [viewMode, setViewMode] = useState<"list" | "grouped">("list");

  // Get saved freebie IDs
  const { savedFreebies, unsaveFreebie, savedCount } = useSavedFreebiesStore();

  // Fetch all restaurants
  const { data: allRestaurants, isLoading } = useRestaurants();

  // Filter to only saved restaurants
  const savedRestaurants = useMemo(() => {
    if (!allRestaurants) return [];
    return allRestaurants.filter((restaurant) =>
      savedFreebies.includes(restaurant.id),
    );
  }, [allRestaurants, savedFreebies]);

  // Sort restaurants based on selected option
  const sortedRestaurants = useMemo(() => {
    const sorted = [...savedRestaurants];

    switch (sortBy) {
      case "redemption":
        const windowOrder = { day: 1, week: 2, month: 3 };
        return sorted.sort(
          (a, b) =>
            windowOrder[a.redemptionWindow] - windowOrder[b.redemptionWindow],
        );

      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));

      case "deadline":
        return sorted.sort(
          (a, b) =>
            a.requirements.advanceSignupDays - b.requirements.advanceSignupDays,
        );

      default:
        return sorted;
    }
  }, [savedRestaurants, sortBy]);

  // Group restaurants by redemption window
  const groupedRestaurants = useMemo(() => {
    const groups = {
      day: savedRestaurants.filter((r) => r.redemptionWindow === "day"),
      week: savedRestaurants.filter((r) => r.redemptionWindow === "week"),
      month: savedRestaurants.filter((r) => r.redemptionWindow === "month"),
    };
    return groups;
  }, [savedRestaurants]);

  const handleUnsave = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    unsaveFreebie(id);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.secondary} />
      </View>
    );
  }

  const renderRestaurantCard = (restaurant: any, index: number) => (
    <Animated.View
      key={restaurant.id}
      entering={FadeInDown.delay(index * 50)}
      exiting={FadeOutLeft}
    >
      <Link href={`/(modal)/(restaurant)/${restaurant.id}`} asChild>
        <TouchableOpacity style={styles.card}>
          <Image source={restaurant.image!} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {restaurant.name}
              </Text>
              {!restaurant.requirements.requiresApp &&
                restaurant.requirements.advanceSignupDays === 0 && (
                  <View style={styles.easyBadge}>
                    <Text style={styles.easyBadgeText}>Easy</Text>
                  </View>
                )}
            </View>

            <Text style={styles.cardDescription} numberOfLines={2}>
              {restaurant.offer.title}
            </Text>

            <View style={styles.cardFooter}>
              <View style={styles.cardFooterItem}>
                <Ionicons name="calendar-outline" size={14} color="#666" />
                <Text style={styles.cardFooterText}>
                  {restaurant.redemptionWindow === "day"
                    ? "Birthday only"
                    : restaurant.redemptionWindow === "week"
                      ? "Birthday week"
                      : "Entire month"}
                </Text>
              </View>

              {restaurant.requirements.advanceSignupDays > 0 && (
                <View style={styles.cardFooterItem}>
                  <Ionicons name="time-outline" size={14} color="#F59E0B" />
                  <Text style={[styles.cardFooterText, { color: "#F59E0B" }]}>
                    {restaurant.requirements.advanceSignupDays}d advance
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Unsave Button */}
          <TouchableOpacity
            style={styles.unsaveButton}
            onPress={() => handleUnsave(restaurant.id)}
          >
            <Ionicons name="bookmark" size={20} color={Colors.secondary} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Saved</Text>
          {savedCount > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{savedCount}</Text>
            </View>
          )}
        </View>

        {/* View Mode Toggle */}
        {savedCount > 0 && (
          <View style={styles.viewModeToggle}>
            <TouchableOpacity
              style={[
                styles.viewModeButton,
                viewMode === "list" && styles.viewModeButtonActive,
              ]}
              onPress={() => setViewMode("list")}
            >
              <Ionicons
                name="list"
                size={18}
                color={viewMode === "list" ? "#fff" : Colors.muted}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewModeButton,
                viewMode === "grouped" && styles.viewModeButtonActive,
              ]}
              onPress={() => setViewMode("grouped")}
            >
              <Ionicons
                name="grid"
                size={18}
                color={viewMode === "grouped" ? "#fff" : Colors.muted}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Empty State */}
      {savedRestaurants.length === 0 ? (
        <Animated.View entering={FadeInDown} style={styles.emptyStateContainer}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="bookmark-outline" size={80} color={Colors.light} />
          </View>
          <Text style={styles.emptyTitle}>No saved freebies yet</Text>
          <Text style={styles.emptySubtitle}>
            Start browsing and save your favorite birthday freebies to see them
            here
          </Text>
          <Link href="/(app)/(auth)/(tabs)/explore" asChild>
            <TouchableOpacity style={styles.browseButton}>
              <Text style={styles.browseButtonText}>Browse Freebies</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </Link>
        </Animated.View>
      ) : (
        <>
          {/* Sort Options - Only show in list view */}
          {viewMode === "list" && (
            <View style={styles.sortContainer}>
              <Text style={styles.sortLabel}>Sort by:</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sortOptions}
              >
                <TouchableOpacity
                  style={[
                    styles.sortButton,
                    sortBy === "redemption" && styles.sortButtonActive,
                  ]}
                  onPress={() => setSortBy("redemption")}
                >
                  <Text
                    style={[
                      styles.sortButtonText,
                      sortBy === "redemption" && styles.sortButtonTextActive,
                    ]}
                  >
                    Redemption Window
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.sortButton,
                    sortBy === "deadline" && styles.sortButtonActive,
                  ]}
                  onPress={() => setSortBy("deadline")}
                >
                  <Text
                    style={[
                      styles.sortButtonText,
                      sortBy === "deadline" && styles.sortButtonTextActive,
                    ]}
                  >
                    Signup Deadline
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.sortButton,
                    sortBy === "name" && styles.sortButtonActive,
                  ]}
                  onPress={() => setSortBy("name")}
                >
                  <Text
                    style={[
                      styles.sortButtonText,
                      sortBy === "name" && styles.sortButtonTextActive,
                    ]}
                  >
                    Name
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}

          {/* Content - List or Grouped */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          >
            {viewMode === "list" ? (
              // List View
              sortedRestaurants.map((restaurant, index) =>
                renderRestaurantCard(restaurant, index),
              )
            ) : (
              // Grouped View
              <>
                {/* Birthday Day Group */}
                {groupedRestaurants.day.length > 0 && (
                  <View style={styles.groupSection}>
                    <View style={styles.groupHeader}>
                      <Ionicons
                        name="calendar"
                        size={20}
                        color={Colors.secondary}
                      />
                      <Text style={styles.groupTitle}>Birthday Day Only</Text>
                      <View style={styles.groupCount}>
                        <Text style={styles.groupCountText}>
                          {groupedRestaurants.day.length}
                        </Text>
                      </View>
                    </View>
                    {groupedRestaurants.day.map((restaurant, index) =>
                      renderRestaurantCard(restaurant, index),
                    )}
                  </View>
                )}

                {/* Birthday Week Group */}
                {groupedRestaurants.week.length > 0 && (
                  <View style={styles.groupSection}>
                    <View style={styles.groupHeader}>
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color={Colors.secondary}
                      />
                      <Text style={styles.groupTitle}>Birthday Week</Text>
                      <View style={styles.groupCount}>
                        <Text style={styles.groupCountText}>
                          {groupedRestaurants.week.length}
                        </Text>
                      </View>
                    </View>
                    {groupedRestaurants.week.map((restaurant, index) =>
                      renderRestaurantCard(restaurant, index),
                    )}
                  </View>
                )}

                {/* Birth Month Group */}
                {groupedRestaurants.month.length > 0 && (
                  <View style={styles.groupSection}>
                    <View style={styles.groupHeader}>
                      <Ionicons
                        name="calendar-clear-outline"
                        size={20}
                        color={Colors.secondary}
                      />
                      <Text style={styles.groupTitle}>Entire Birth Month</Text>
                      <View style={styles.groupCount}>
                        <Text style={styles.groupCountText}>
                          {groupedRestaurants.month.length}
                        </Text>
                      </View>
                    </View>
                    {groupedRestaurants.month.map((restaurant, index) =>
                      renderRestaurantCard(restaurant, index),
                    )}
                  </View>
                )}
              </>
            )}

            {/* Bottom Padding */}
            <View style={{ height: 100 }} />
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontFamily: Fonts.brandBlack,
    fontSize: 32,
    color: Colors.dark,
  },
  countBadge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  // View Mode Toggle
  viewModeToggle: {
    flexDirection: "row",
    backgroundColor: Colors.light,
    borderRadius: 8,
    padding: 2,
    gap: 2,
  },
  viewModeButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  viewModeButtonActive: {
    backgroundColor: Colors.secondary,
  },

  // Empty State
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: Fonts.brandBold,
    color: Colors.dark,
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.muted,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  browseButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  browseButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Sort Options
  sortContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  sortLabel: {
    fontSize: 14,
    color: Colors.muted,
    marginBottom: 8,
    fontWeight: "500",
  },
  sortOptions: {
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light,
  },
  sortButtonActive: {
    backgroundColor: Colors.secondary,
  },
  sortButtonText: {
    fontSize: 14,
    color: Colors.dark,
    fontWeight: "500",
  },
  sortButtonTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

  // List
  listContainer: {
    paddingHorizontal: 16,
  },

  // Grouped View
  groupSection: {
    marginBottom: 24,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primaryLight,
  },
  groupTitle: {
    fontSize: 18,
    fontFamily: Fonts.brandBold,
    color: Colors.dark,
    flex: 1,
  },
  groupCount: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  groupCountText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.secondary,
  },

  // Card
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.light,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },
  cardImage: {
    width: 100,
    height: 120,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.dark,
    flex: 1,
  },
  easyBadge: {
    backgroundColor: Colors.secondary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  easyBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.muted,
    marginBottom: 8,
    lineHeight: 18,
  },
  cardFooter: {
    gap: 8,
  },
  cardFooterItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardFooterText: {
    fontSize: 12,
    color: "#666",
  },
  unsaveButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
});

export default SavedScreen;
