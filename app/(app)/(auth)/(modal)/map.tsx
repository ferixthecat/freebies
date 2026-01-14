import { Colors } from "@/constants/theme";
import { useRestaurantMarkers, useRestaurants } from "@/hooks/useBusinesses";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Location from "expo-location";
import { AppleMaps, GoogleMaps } from "expo-maps";
import { GoogleMapsMapType } from "expo-maps/build/google/GoogleMaps.types";
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
  const mapRef = useRef<GoogleMaps.MapView>(null);

  const { data: restaurants, isLoading: restaurantsLoading } = useRestaurants();
  const { data: restaurantMarkers, isLoading: restaurantMarkersLoading } =
    useRestaurantMarkers();

  const markers: GoogleMaps.Marker[] =
    restaurantMarkers?.map((marker) => ({
      id: marker.id,
      systemImage: "mappin.circle.fill",
      tintColor: Colors.muted,
      coordinates: {
        latitude: marker.latitude,
        longitude: marker.longitude,
      },
      title: marker.name,
    })) || [];

  const locateMe = async () => {
    let location = await Location.getCurrentPositionAsync();
    mapRef.current?.setCameraPosition({
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      zoom: 14,
    });
  };

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");

        return;
      }
      locateMe();
    }
    getCurrentLocation();
  }, []);

  if (restaurantsLoading || restaurantMarkersLoading) {
    return (
      <View>
        <ActivityIndicator size={"large"} color={Colors.secondary} />
      </View>
    );
  }

  const markerSelected = (e: any) => {
    router.push(`/(modal)/(restaurant)/${e.id}`);
  };

  if (Platform.OS === "android") {
    return (
      <>
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.dismiss()}
          >
            <Ionicons name="chevron-back" size={22} color={Colors.muted} />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <Link href={"/(app)/(auth)/(modal)/filter"} asChild>
              <TouchableOpacity style={styles.backBtn}>
                <Ionicons name="filter" size={22} />
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.backBtn} onPress={locateMe}>
              <Ionicons name="locate-outline" size={22} />
            </TouchableOpacity>
          </View>
        </View>
        <GoogleMaps.View
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          markers={markers}
          properties={{
            isTrafficEnabled: false,
            mapType: GoogleMapsMapType.NORMAL,
            selectionEnabled: false,
            isMyLocationEnabled: false,
          }}
          uiSettings={{
            myLocationButtonEnabled: false,
            compassEnabled: false,
          }}
          onMarkerClick={markerSelected}
        />
        <View style={styles.footerScroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {restaurants?.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.card}
                onPress={() =>
                  router.push(`/(modal)/(restaurant)/${restaurant.id}`)
                }
              >
                <Image source={restaurant.image!} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {restaurant.name}
                    </Text>
                    {restaurant.tags.includes("Wolt+") && (
                      <View style={styles.woltBadge}>
                        <Text style={styles.woltBadgeText}>W+</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.cardDescription} numberOfLines={1}>
                    {restaurant.description}
                  </Text>
                  <View style={styles.cardFooter}>
                    <Ionicons name="bicycle-outline" size={14} color="#666" />
                    <Text style={styles.cardFooterText}>
                      {restaurant.deliveryFee === 0
                        ? "Free delivery"
                        : `${restaurant.deliveryFee.toFixed(2)} €`}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </>
    );
  } else if (Platform.OS === "ios") {
    return <AppleMaps.View style={{ flex: 1 }} />;
  } else {
    return <Text>Maps are only supported on Android and iOS</Text>;
  }
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 40,
    height: 40,
    backgroundColor: Colors.background,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 2px -2px rgba(0,0,0,0.1)",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footerScroll: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
    marginVertical: 16,
  },
  card: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 16,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    flexDirection: "row",
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    margin: 10,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    paddingLeft: 0,
    justifyContent: "center",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    flex: 1,
  },
  woltBadge: {
    backgroundColor: "#009de0",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  woltBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },
  cardDescription: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardFooterText: {
    fontSize: 12,
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default Page;
