import { Colors } from "@/constants/theme";
import type { CategoryId } from "@/data/categories";
import { categories } from "@/data/categories";
import { useFilterStore } from "@/hooks/useFilterStore";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const CategoryList = () => {
  const { selectedCategories, toggleCategory } = useFilterStore();

  const handleToggle = (id: CategoryId) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleCategory(id);
  };

  const renderCategory = ({ item }: { item: (typeof categories)[0] }) => {
    const isSelected = selectedCategories.includes(item.id as CategoryId);

    return (
      <TouchableOpacity
        style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
        onPress={() => handleToggle(item.id as CategoryId)}
        activeOpacity={0.75}
      >
        <View
          style={[
            styles.categoryImageContainer,
            {
              backgroundColor: isSelected
                ? Colors.secondary
                : item.backgroundColor,
            },
          ]}
        >
          <Image source={item.image} style={styles.categoryImage} />
        </View>
        <View
          style={[
            styles.categoryInfo,
            isSelected && styles.categoryInfoSelected,
          ]}
        >
          <Text
            style={[
              styles.categoryName,
              isSelected && styles.categoryNameSelected,
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.categoryPlaces,
              isSelected && styles.categoryPlacesSelected,
            ]}
          >
            {item.placesCount} places
          </Text>
        </View>
        {isSelected && (
          <View style={styles.checkBadge}>
            <Text style={styles.checkBadgeText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.categoriesSection}>
      <View style={styles.categoriesHeader}>
        <Text style={styles.categoriesTitle}>
          Categories
          {selectedCategories.length > 0 && (
            <Text style={styles.activeCount}>
              {" "}
              ({selectedCategories.length})
            </Text>
          )}
        </Text>
        <Link href="/(app)/(auth)/(modal)/filter" asChild>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesSection: {
    marginBottom: 24,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 6,
  },
  activeCount: {
    color: Colors.secondary,
    fontWeight: "700",
  },
  seeAll: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: "500",
  },
  seeAllButton: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
  },
  categoriesList: {
    gap: 12,
    paddingHorizontal: 16,
  },
  categoryCard: {
    width: 130,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginVertical: 8,
    boxShadow: "0px 4px 2px -2px rgba(0, 0, 0, 0.2)",
    elevation: 2,
    position: "relative",
    borderWidth: 2,
    borderColor: "transparent",
  },
  categoryCardSelected: {
    borderColor: Colors.secondary,
    elevation: 4,
  },
  categoryImageContainer: {
    padding: 12,
  },
  categoryImage: {
    width: 106,
    height: 106,
    borderRadius: 8,
  },
  categoryInfo: {
    backgroundColor: "#fff",
    padding: 12,
    paddingTop: 4,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.light,
  },
  categoryInfoSelected: {
    borderColor: Colors.secondary,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  categoryNameSelected: {
    color: Colors.secondary,
  },
  categoryPlaces: {
    fontSize: 12,
    color: Colors.muted,
  },
  categoryPlacesSelected: {
    color: Colors.secondary,
  },
  checkBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  checkBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
});
