import { categoryImages } from "@/constants/images";
import { Colors } from "@/constants/theme";
import { useFilteredRestaurants } from "@/hooks/useFilteredRestaurants";
import Ionicons from "@expo/vector-icons/Ionicons";
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
        <View key={item.id}>
          <Link href={`(modal)/(restaurant)/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Image
                source={categoryImages[item.category]}
                style={styles.image}
              />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>

              <View style={styles.metadata}>
                <Ionicons name="gift-outline" size={16} color={"#666"} />
                <Text style={styles.metadataText}>
                  {item.requirements.requiresApp ? "Rewards App" : "No App"}
                </Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.metadataText}>
                  {item.redemptionWindow === "day"
                    ? "Birthday day"
                    : item.redemptionWindow === "week"
                      ? "Birthday week"
                      : "Entire month"}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>
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
  card: {
    margin: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.light,
    overflow: "hidden",
    boxShadow: "0px 4px 2px -2px rgba(0, 0, 0, 0.2)",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  metadata: {
    borderTopColor: Colors.light,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 10,
  },
  metadataText: {
    fontSize: 14,
    color: "#666",
  },
  dot: {
    color: "#999",
    fontSize: 13,
  },
});

export default BusinessList;
