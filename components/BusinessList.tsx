import { categoryImages } from "@/constants/images";
import { Colors } from "@/constants/theme";
import { useFilteredRestaurants } from "@/hooks/useFilteredRestaurants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BusinessList = () => {
  const { restaurants, hasActiveFilters, resultCount } =
    useFilteredRestaurants();

  if (hasActiveFilters && resultCount === 0) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="search-outline" size={48} color={Colors.light} />
        <Text style={styles.emptyTitle}>No results found</Text>
        <Text style={styles.emptySubtitle}>
          Try adjusting your filters or search query
        </Text>
      </View>
    );
  }

  return (
    <>
      {hasActiveFilters && (
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {resultCount} {resultCount === 1 ? "result" : "results"} found
          </Text>
        </View>
      )}

      {restaurants.map((item) => (
        <Link
          key={item.id}
          href={`/(app)/(auth)/(modal)/(restaurant)/${item.id}`}
          asChild
        >
          <TouchableOpacity style={styles.card}>
            <Image
              source={categoryImages[item.category]}
              style={styles.image}
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.45)"]}
              style={styles.imageGradient}
            />
            <View style={styles.imageBadges}>
              {item.requirements.requiresApp ? (
                <View style={styles.badge}>
                  <Ionicons
                    name="phone-portrait-outline"
                    size={11}
                    color="#fff"
                  />
                  <Text style={styles.badgeText}>App Required</Text>
                </View>
              ) : (
                <View style={[styles.badge, styles.badgeEasy]}>
                  <Ionicons name="checkmark-circle" size={11} color="#fff" />
                  <Text style={styles.badgeText}>No App</Text>
                </View>
              )}
              <View style={[styles.badge, styles.badgeWindow]}>
                <Ionicons name="calendar-outline" size={11} color="#fff" />
                <Text style={styles.badgeText}>
                  {item.redemptionWindow === "day"
                    ? "Birthday day"
                    : item.redemptionWindow === "week"
                      ? "Birthday week"
                      : "Entire month"}
                </Text>
              </View>
            </View>

            {/* Content below image — seamless, no border */}
            <View style={styles.content}>
              <View style={styles.contentRow}>
                <View style={styles.contentLeft}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
                {/* Offer pill */}
                <View style={styles.offerPill}>
                  <Ionicons
                    name="gift-outline"
                    size={14}
                    color={Colors.secondary}
                  />
                </View>
              </View>

              {/* Offer title */}
              <View style={styles.offerRow}>
                <Text style={styles.offerTitle} numberOfLines={1}>
                  🎁 {item.offer.title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: 13,
    color: Colors.muted,
    fontWeight: "500",
  },
  emptyState: {
    paddingVertical: 60,
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.dark,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.muted,
    textAlign: "center",
    lineHeight: 20,
  },

  // Card — no border, soft shadow only
  card: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 18,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },

  // Taller image, full bleed
  image: {
    width: "100%",
    height: 200,
  },

  // Gradient sits on top of image
  imageGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100, // start fading halfway down
    height: 100,
  },

  // Badges float over bottom of image
  imageBadges: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    gap: 6,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeEasy: {
    backgroundColor: "rgba(16,185,129,0.75)", // green tint for easy
  },
  badgeWindow: {
    backgroundColor: "rgba(0,148,221,0.75)", // brand blue tint
  },
  badgeText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "600",
  },

  // Content area — pure white, no border, just padding
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  contentLeft: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.dark,
    marginBottom: 3,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 13,
    color: Colors.muted,
    lineHeight: 18,
  },
  offerPill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },

  // Offer strip at bottom
  offerRow: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  offerTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.secondary,
  },
});

export default BusinessList;
