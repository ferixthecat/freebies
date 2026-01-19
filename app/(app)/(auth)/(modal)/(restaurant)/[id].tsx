import { Colors } from "@/constants/theme";
import { useRestaurant } from "@/hooks/useBusinesses";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = 300;

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const scrollOffset = useSharedValue(0);
  const insets = useSafeAreaInsets();

  // Fetch data
  const { data: restaurant, isLoading: restaurantLoading } = useRestaurant(
    id || "",
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMAGE_HEIGHT / 2], [0, 1]),
    };
  });

  if (restaurantLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} color={Colors.secondary} />
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Freebie not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <Animated.Image
        style={styles.backgroundImage}
        resizeMode={"cover"}
        source={restaurant.image!}
      />

      {/* Animated Header Bar */}
      <Animated.View
        style={[
          styles.animatedHeader,
          { paddingTop: insets.top },
          headerAnimatedStyle,
        ]}
      >
        <Text style={styles.animatedHeaderText} numberOfLines={1}>
          {restaurant.name}
        </Text>
      </Animated.View>

      {/* Back Button */}
      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + 10 }]}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Main Content */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: IMAGE_HEIGHT - 30 },
        ]}
      >
        {/* Main Info Card */}
        <View style={styles.mainCard}>
          <View style={styles.businessHeader}>
            <View style={styles.businessInfo}>
              <Text style={styles.businessName}>{restaurant.name}</Text>
              {restaurant.verified && (
                <View style={styles.verifiedBadge}>
                  <MaterialIcons name="verified" size={16} color="#10B981" />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.saveButton}>
              <Ionicons
                name="bookmark-outline"
                size={24}
                color={Colors.secondary}
              />
            </TouchableOpacity>
          </View>

          {/* Offer */}
          <View style={styles.offerSection}>
            <View style={styles.offerHeader}>
              <Ionicons name="gift" size={24} color="#EF4444" />
              <Text style={styles.offerTitle}>{restaurant.offer.title}</Text>
            </View>
            {restaurant.offer.description && (
              <Text style={styles.offerDescription}>
                {restaurant.offer.description}
              </Text>
            )}
            {restaurant.offer.valueRange && (
              <Text style={styles.valueText}>
                Estimated value: $
                {restaurant.offer.valueRange.min ===
                restaurant.offer.valueRange.max
                  ? restaurant.offer.valueRange.min.toFixed(2)
                  : `${restaurant.offer.valueRange.min.toFixed(2)} - $${restaurant.offer.valueRange.max.toFixed(2)}`}
              </Text>
            )}
          </View>

          {/* Redemption Window */}
          <View style={styles.infoRow}>
            <Ionicons name="calendar" size={20} color={Colors.secondary} />
            <Text style={styles.infoText}>
              Valid:{" "}
              {restaurant.redemptionWindow === "day"
                ? "Birthday day only"
                : restaurant.redemptionWindow === "week"
                  ? "Birthday week"
                  : "Entire birth month"}
            </Text>
          </View>
        </View>

        {/* Requirements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <View style={styles.requirementsList}>
            <RequirementItem
              icon={
                restaurant.requirements.requiresApp
                  ? "checkmark-circle"
                  : "close-circle"
              }
              text={
                restaurant.requirements.requiresApp
                  ? "Rewards app required"
                  : "No app required"
              }
              met={!restaurant.requirements.requiresApp}
            />
            <RequirementItem
              icon={
                restaurant.requirements.requiresEmail
                  ? "checkmark-circle"
                  : "close-circle"
              }
              text={
                restaurant.requirements.requiresEmail
                  ? "Email signup required"
                  : "No email required"
              }
              met={!restaurant.requirements.requiresEmail}
            />
            <RequirementItem
              icon={
                restaurant.requirements.requiresID
                  ? "checkmark-circle"
                  : "close-circle"
              }
              text={
                restaurant.requirements.requiresID
                  ? "ID required"
                  : "No ID required"
              }
              met={restaurant.requirements.requiresID}
            />
            {restaurant.requirements.advanceSignupDays > 0 && (
              <RequirementItem
                icon="time"
                text={`Sign up ${restaurant.requirements.advanceSignupDays} days in advance`}
                met={true}
                isWarning
              />
            )}
          </View>
        </View>

        {/* How to Get It */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Get It</Text>
          <View style={styles.instructionsList}>
            {restaurant.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.instructionNumber}>
                  <Text style={styles.instructionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Restrictions */}
        {restaurant.restrictions && restaurant.restrictions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Important Notes</Text>
            {restaurant.restrictions.map((restriction, index) => (
              <View key={index} style={styles.restrictionItem}>
                <Ionicons name="alert-circle" size={16} color="#F59E0B" />
                <Text style={styles.restrictionText}>{restriction}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Bottom Padding */}
        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      {/* Save Button (Fixed at bottom) */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity style={styles.saveToListButton}>
          <Ionicons name="bookmark" size={20} color="white" />
          <Text style={styles.saveToListButtonText}>Save to My List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Helper Component
const RequirementItem = ({
  icon,
  text,
  met,
  isWarning = false,
}: {
  icon: any;
  text: string;
  met: boolean;
  isWarning?: boolean;
}) => (
  <View style={styles.requirementItem}>
    <Ionicons
      name={icon}
      size={20}
      color={isWarning ? "#F59E0B" : met ? "#10B981" : "#EF4444"}
    />
    <Text style={styles.requirementText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width,
    height: IMAGE_HEIGHT,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  errorText: {
    fontSize: 16,
    color: "#6B7280",
  },
  animatedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    zIndex: 10,
  },
  animatedHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  backButton: {
    position: "absolute",
    left: 16,
    zIndex: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  mainCard: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginBottom: 12,
  },
  businessHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  verifiedText: {
    fontSize: 14,
    color: "#10B981",
    fontWeight: "500",
  },
  saveButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  offerSection: {
    backgroundColor: "#FEF2F2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  offerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EF4444",
  },
  offerDescription: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 8,
  },
  valueText: {
    fontSize: 14,
    color: "#10B981",
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    fontSize: 15,
    color: "#6B7280",
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  requirementsList: {
    gap: 12,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  requirementText: {
    fontSize: 15,
    color: "#374151",
    flex: 1,
  },
  instructionsList: {
    gap: 16,
  },
  instructionItem: {
    flexDirection: "row",
    gap: 12,
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  instructionNumberText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  restrictionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8,
  },
  restrictionText: {
    flex: 1,
    fontSize: 14,
    color: "#6B7280",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    padding: 16,
  },
  saveToListButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 12,
  },
  saveToListButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Page;
