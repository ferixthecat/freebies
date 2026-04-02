import { categoryImages } from "@/constants/images";
import { Colors, Fonts } from "@/constants/theme";
import { useRestaurantMarkers, useRestaurants } from "@/hooks/useBusinesses";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Location from "expo-location";
import { AppleMaps, GoogleMaps } from "expo-maps";
import { AppleMapsMapType } from "expo-maps/build/apple/AppleMaps.types";
import { Link, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Page = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<AppleMaps.MapView | GoogleMaps.MapView>(null);

  const { data: restaurants, isLoading: restaurantsLoading } = useRestaurants();
  const { data: restaurantMarkers, isLoading: markersLoading } =
    useRestaurantMarkers();

  // Build markers — color-coded by redemption window
  const markers: AppleMaps.Marker[] =
    restaurantMarkers?.map((marker) => {
      // Find the matching restaurant to get redemption window
      const restaurant = restaurants?.find((r) => r.id === marker.id);
      const tintColor =
        restaurant?.redemptionWindow === "day"
          ? "#EF4444" // red — birthday day only
          : restaurant?.redemptionWindow === "week"
            ? Colors.secondary // blue — birthday week
            : "#10B981"; // green — entire month

      return {
        id: marker.id,
        systemImage: "gift.fill",
        tintColor,
        coordinates: {
          latitude: marker.latitude,
          longitude: marker.longitude,
        },
        title: marker.name,
      };
    }) || [];

  const locateMe = async () => {
    try {
      const location = await Location.getCurrentPositionAsync();
      if (Platform.OS === "android") {
        (mapRef.current as any)?.animateCamera({
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          zoom: 14,
        });
      } else {
        (mapRef.current as any)?.setCameraPosition({
          coordinates: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          zoom: 14,
        });
      }
    } catch (error) {
      console.error("Failed to get location:", error);
    }
  };

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      locateMe();
    }
    getCurrentLocation();
  }, []);

  if (restaurantsLoading || markersLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.secondary} />
      </View>
    );
  }

  const markerSelected = (e: any) => {
    router.push(`/(modal)/(restaurant)/${e.id}`);
  };

  if (Platform.OS === "android") {
    return (
      <>
        {/* Floating Header */}
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.dismiss()}
          >
            <Ionicons name="chevron-back" size={22} color={Colors.dark} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Map View</Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.legend}>
              <View
                style={[styles.legendDot, { backgroundColor: "#EF4444" }]}
              />
              <View
                style={[
                  styles.legendDot,
                  { backgroundColor: Colors.secondary },
                ]}
              />
              <View
                style={[styles.legendDot, { backgroundColor: "#10B981" }]}
              />
            </View>
            <Link href="/(app)/(auth)/(modal)/filter" asChild>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="filter" size={20} color={Colors.dark} />
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.headerButton} onPress={locateMe}>
              <Ionicons name="locate-outline" size={20} color={Colors.dark} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Map */}
        <GoogleMaps.View
          ref={mapRef as any}
          style={StyleSheet.absoluteFill}
          markers={markers as any}
          cameraPosition={{
            coordinates: {
              latitude: 43.6532,
              longitude: -79.3832,
            },
            zoom: 12,
          }}
          onMarkerClick={markerSelected}
        />

        {/* Legend card */}
        <View style={[styles.legendCard, { top: insets.top + 72 }]}>
          <LegendItem color="#EF4444" label="Birthday only" />
          <LegendItem color={Colors.secondary} label="Birthday week" />
          <LegendItem color="#10B981" label="Entire month" />
        </View>

        {/* Bottom cards */}
        <View style={styles.footerScroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {restaurants?.map((restaurant) => {
              const windowColor =
                restaurant.redemptionWindow === "day"
                  ? "#EF4444"
                  : restaurant.redemptionWindow === "week"
                    ? Colors.secondary
                    : "#10B981";

              const windowLabel =
                restaurant.redemptionWindow === "day"
                  ? "Birthday only"
                  : restaurant.redemptionWindow === "week"
                    ? "Birthday week"
                    : "Entire month";

              return (
                <TouchableOpacity
                  key={restaurant.id}
                  style={styles.card}
                  onPress={() =>
                    router.push(`/(modal)/(restaurant)/${restaurant.id}`)
                  }
                >
                  <Image
                    source={categoryImages[restaurant.category]}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle} numberOfLines={1}>
                        {restaurant.name}
                      </Text>
                      {restaurant.verified && (
                        <Ionicons
                          name="checkmark-circle"
                          size={14}
                          color="#10B981"
                        />
                      )}
                    </View>
                    <Text style={styles.cardOffer} numberOfLines={1}>
                      🎁 {restaurant.offer.title}
                    </Text>
                    <View style={styles.cardFooter}>
                      <View
                        style={[
                          styles.windowBadge,
                          { backgroundColor: windowColor + "20" },
                        ]}
                      >
                        <View
                          style={[
                            styles.windowDot,
                            { backgroundColor: windowColor },
                          ]}
                        />
                        <Text
                          style={[styles.windowText, { color: windowColor }]}
                        >
                          {windowLabel}
                        </Text>
                      </View>
                      {!restaurant.requirements.requiresApp && (
                        <View style={styles.easyBadge}>
                          <Text style={styles.easyBadgeText}>Easy</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </>
    );
  } else if (Platform.OS === "ios") {
    return (
      <>
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.dismiss()}
          >
            <Ionicons name="chevron-back" size={22} color={Colors.dark} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Map View</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.legend}>
              <View
                style={[styles.legendDot, { backgroundColor: "#EF4444" }]}
              />
              <View
                style={[
                  styles.legendDot,
                  { backgroundColor: Colors.secondary },
                ]}
              />
              <View
                style={[styles.legendDot, { backgroundColor: "#10B981" }]}
              />
            </View>
            <Link href="/(app)/(auth)/(modal)/filter" asChild>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="filter" size={20} color={Colors.dark} />
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.headerButton} onPress={locateMe}>
              <Ionicons name="locate-outline" size={20} color={Colors.dark} />
            </TouchableOpacity>
          </View>
        </View>
        <AppleMaps.View
          ref={mapRef as any}
          style={StyleSheet.absoluteFill}
          markers={markers}
          properties={{
            isTrafficEnabled: false,
            mapType: AppleMapsMapType.STANDARD,
            selectionEnabled: false,
            isMyLocationEnabled: false,
          }}
          uiSettings={{
            myLocationButtonEnabled: false,
            compassEnabled: false,
          }}
          onMarkerClick={markerSelected}
        />
        <View style={[styles.legendCard, { top: insets.top + 72 }]}>
          <LegendItem color="#EF4444" label="Birthday only" />
          <LegendItem color={Colors.secondary} label="Birthday week" />
          <LegendItem color="#10B981" label="Entire month" />
        </View>
        <View style={styles.footerScroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {restaurants?.map((restaurant) => {
              const windowColor =
                restaurant.redemptionWindow === "day"
                  ? "#EF4444"
                  : restaurant.redemptionWindow === "week"
                    ? Colors.secondary
                    : "#10B981";
              const windowLabel =
                restaurant.redemptionWindow === "day"
                  ? "Birthday only"
                  : restaurant.redemptionWindow === "week"
                    ? "Birthday week"
                    : "Entire month";
              return (
                <TouchableOpacity
                  key={restaurant.id}
                  style={styles.card}
                  onPress={() =>
                    router.push(`/(modal)/(restaurant)/${restaurant.id}`)
                  }
                >
                  <Image
                    source={categoryImages[restaurant.category]}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle} numberOfLines={1}>
                        {restaurant.name}
                      </Text>
                      {restaurant.verified && (
                        <Ionicons
                          name="checkmark-circle"
                          size={14}
                          color="#10B981"
                        />
                      )}
                    </View>
                    <Text style={styles.cardOffer} numberOfLines={1}>
                      🎁 {restaurant.offer.title}
                    </Text>
                    <View style={styles.cardFooter}>
                      <View
                        style={[
                          styles.windowBadge,
                          { backgroundColor: windowColor + "20" },
                        ]}
                      >
                        <View
                          style={[
                            styles.windowDot,
                            { backgroundColor: windowColor },
                          ]}
                        />
                        <Text
                          style={[styles.windowText, { color: windowColor }]}
                        >
                          {windowLabel}
                        </Text>
                      </View>
                      {!restaurant.requirements.requiresApp && (
                        <View style={styles.easyBadge}>
                          <Text style={styles.easyBadgeText}>Easy</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </>
    );
  } else {
    return <Text>Maps are only supported on Android and iOS!</Text>;
  }
};

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendItemDot, { backgroundColor: color }]} />
    <Text style={styles.legendItemText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  // Header
  header: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.background,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: Colors.dark,
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // Legend card
  legendCard: {
    position: "absolute",
    left: 16,
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 5,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendItemDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendItemText: {
    fontSize: 11,
    color: Colors.dark,
    fontWeight: "500",
  },

  // Footer scroll
  footerScroll: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
    paddingVertical: 8,
  },

  // Cards
  card: {
    width: 260,
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  cardImage: {
    width: 80,
    height: 90,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.dark,
    flex: 1,
  },
  cardOffer: {
    fontSize: 12,
    color: Colors.muted,
    lineHeight: 16,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  windowBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  windowDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  windowText: {
    fontSize: 10,
    fontWeight: "600",
  },
  easyBadge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  easyBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },
});

export default Page;
