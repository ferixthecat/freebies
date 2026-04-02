import { Colors, Fonts } from "@/constants/theme";
import useUserStore from "@/hooks/use-userstore";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SAVED_ADDRESSES = [
  { id: "1", street: "123 King St W", city: "Toronto, ON" },
  { id: "2", street: "456 Queen St E", city: "Toronto, ON" },
];

const Page = () => {
  const router = useRouter();
  const { profile, updateProfile } = useUserStore();
  const [locating, setLocating] = useState(false);

  const currentLocation = profile?.location ?? "Toronto, ON";

  const selectLocation = async (city: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await updateProfile({ location: city });
      router.dismiss();
    } catch {
      Alert.alert("Error", "Could not save location. Please try again.");
    }
  };

  const handleCurrentLocation = async () => {
    setLocating(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Allow location access in your device settings to use this feature.",
        );
        return;
      }

      const coords = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const [place] = await Location.reverseGeocodeAsync({
        latitude: coords.coords.latitude,
        longitude: coords.coords.longitude,
      });

      if (!place) {
        Alert.alert("Error", "Could not determine your location.");
        return;
      }

      // Build a readable city string: "Toronto, ON" or "Toronto, Ontario, CA"
      const city = [place.city, place.region].filter(Boolean).join(", ");

      await selectLocation(city || "Current Location");
    } catch {
      Alert.alert("Error", "Could not get your location. Please try again.");
    } finally {
      setLocating(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location</Text>

      {/* Current location indicator */}
      {currentLocation && (
        <View style={styles.currentBanner}>
          <Ionicons name="location" size={14} color={Colors.secondary} />
          <Text style={styles.currentText}>Currently: {currentLocation}</Text>
        </View>
      )}

      {/* Use Current Location */}
      <TouchableOpacity
        style={styles.locationItem}
        onPress={handleCurrentLocation}
        disabled={locating}
      >
        <View style={styles.locationItemIcon}>
          {locating ? (
            <ActivityIndicator size="small" color={Colors.secondary} />
          ) : (
            <Ionicons name="locate-outline" size={18} color="#000" />
          )}
        </View>
        <Text style={styles.locationText}>
          {locating ? "Detecting location..." : "Use my current location"}
        </Text>
      </TouchableOpacity>

      {/* Saved Addresses */}
      {SAVED_ADDRESSES.map((addr) => {
        const isActive = currentLocation === addr.city;
        return (
          <TouchableOpacity
            key={addr.id}
            style={[styles.locationItem, isActive && styles.locationItemActive]}
            onPress={() => selectLocation(addr.city)}
          >
            <View style={styles.locationItemIcon}>
              <Ionicons
                name="location-outline"
                size={18}
                color={isActive ? Colors.secondary : "#000"}
              />
            </View>
            <View style={styles.addressInfo}>
              <Text
                style={[
                  styles.addressText,
                  isActive && styles.addressTextActive,
                ]}
              >
                {addr.street}
              </Text>
              <Text
                style={[styles.cityText, isActive && styles.cityTextActive]}
              >
                {addr.city}
              </Text>
            </View>
            {isActive && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={Colors.secondary}
              />
            )}
          </TouchableOpacity>
        );
      })}

      {/* Divider */}
      <View style={styles.divider} />

      {/* My Addresses — placeholder for future */}
      <TouchableOpacity style={styles.locationItem} onPress={() => {}}>
        <View style={styles.locationItemIcon}>
          <Ionicons name="list-outline" size={18} color="#000" />
        </View>
        <Text style={styles.locationText}>My addresses</Text>
        <Ionicons name="chevron-forward" size={16} color={Colors.muted} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 12,
  },
  currentBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  currentText: {
    fontSize: 13,
    color: Colors.secondary,
    fontWeight: "500",
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    gap: 16,
  },
  locationItemActive: {
    borderBottomColor: Colors.primaryLight,
  },
  locationItemIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.light,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  addressInfo: {
    flex: 1,
  },
  addressText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 2,
  },
  addressTextActive: {
    color: Colors.secondary,
    fontWeight: "600",
  },
  cityText: {
    fontSize: 14,
    color: "#999",
  },
  cityTextActive: {
    color: Colors.secondary,
  },
  divider: {
    height: 8,
    backgroundColor: "#f5f5f5",
    marginHorizontal: -20,
    marginVertical: 8,
  },
});

export default Page;
