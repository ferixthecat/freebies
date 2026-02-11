import { Colors } from "@/constants/theme";
import { Restaurant } from "@/data/businesses";
import { useClaimedFreebiesStore } from "@/hooks/use-claimedfreebies";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FreebieTimelineRowProps {
  freebie: Restaurant;
}

const FreebieTimelineRow = ({ freebie }: FreebieTimelineRowProps) => {
  const { isClaimed, claimFreebie, unclaimFreebie } = useClaimedFreebiesStore();
  const claimed = isClaimed(freebie.id);

  const handleToggleClaimed = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const action = claimed ? unclaimFreebie : claimFreebie;
    action(freebie.id);
  };

  return (
    <View style={[styles.row, claimed && styles.rowClaimed]}>
      {/* Timeline dot */}
      <View style={styles.timelineColumn}>
        <View style={[styles.dot, claimed && styles.dotClaimed]}>
          {claimed && <Ionicons name="checkmark" size={10} color="#fff" />}
        </View>
        <View style={styles.line} />
      </View>

      {/* Content */}
      <Link href={`/(modal)/(restaurant)/${freebie.id}`} asChild>
        <TouchableOpacity style={styles.content} activeOpacity={0.7}>
          <View style={styles.contentHeader}>
            <Text
              style={[styles.name, claimed && styles.nameClaimed]}
              numberOfLines={1}
            >
              {freebie.name}
            </Text>
            {!freebie.requirements.requiresApp &&
              freebie.requirements.advanceSignupDays === 0 && (
                <View style={styles.easyBadge}>
                  <Text style={styles.easyBadgeText}>Easy</Text>
                </View>
              )}
          </View>
          <Text
            style={[styles.offer, claimed && styles.offerClaimed]}
            numberOfLines={1}
          >
            {freebie.offer.title}
          </Text>
          {freebie.requirements.requiresApp && (
            <View style={styles.requirementRow}>
              <Ionicons
                name="phone-portrait-outline"
                size={11}
                color={Colors.muted}
              />
              <Text style={styles.requirementText}>App required</Text>
            </View>
          )}
        </TouchableOpacity>
      </Link>

      {/* Claim button */}
      <TouchableOpacity
        style={[styles.claimButton, claimed && styles.claimButtonClaimed]}
        onPress={handleToggleClaimed}
      >
        <Ionicons
          name={claimed ? "checkmark-circle" : "checkmark-circle-outline"}
          size={26}
          color={claimed ? "#10B981" : Colors.light}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 8,
  },
  rowClaimed: {
    opacity: 0.6,
  },
  timelineColumn: {
    width: 28,
    alignItems: "center",
    paddingTop: 4,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.primaryLight,
    borderWidth: 2,
    borderColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  dotClaimed: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.light,
    marginTop: 4,
    minHeight: 20,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 8,
    paddingBottom: 8,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.dark,
    flex: 1,
  },
  nameClaimed: {
    textDecorationLine: "line-through",
    color: Colors.muted,
  },
  offer: {
    fontSize: 13,
    color: Colors.muted,
    marginBottom: 4,
  },
  offerClaimed: {
    textDecorationLine: "line-through",
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  requirementText: {
    fontSize: 11,
    color: Colors.muted,
  },
  easyBadge: {
    backgroundColor: Colors.secondary,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  easyBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#fff",
  },
  claimButton: {
    padding: 4,
    paddingTop: 2,
  },
  claimButtonClaimed: {},
});

export default FreebieTimelineRow;
