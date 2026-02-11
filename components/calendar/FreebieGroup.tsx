import { Colors, Fonts } from "@/constants/theme";
import { Restaurant } from "@/data/businesses";
import { useClaimedFreebiesStore } from "@/hooks/use-claimedfreebies";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FreebieTimelineRow from "./FreebieTimelineRow";

interface FreebieGroupProps {
  title: string;
  icon: string;
  freebies: Restaurant[];
  accentColor?: string;
  startExpanded?: boolean;
}

const FreebieGroup = ({
  title,
  icon,
  freebies,
  accentColor = Colors.secondary,
  startExpanded = true,
}: FreebieGroupProps) => {
  const [expanded, setExpanded] = useState(startExpanded);
  const { isClaimed } = useClaimedFreebiesStore();

  if (freebies.length === 0) return null;

  const claimedCount = freebies.filter((f) => isClaimed(f.id)).length;
  const allClaimed = claimedCount === freebies.length;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded((prev) => !prev)}
        activeOpacity={0.7}
      >
        <View
          style={[styles.iconBadge, { backgroundColor: accentColor + "20" }]}
        >
          <Ionicons name={icon as any} size={16} color={accentColor} />
        </View>
        <Text style={styles.title}>{title}</Text>

        {/* Progress */}
        <View style={styles.progress}>
          <Text
            style={[styles.progressText, allClaimed && styles.progressDone]}
          >
            {claimedCount}/{freebies.length}
          </Text>
          {allClaimed && (
            <Ionicons name="checkmark-circle" size={14} color="#10B981" />
          )}
        </View>

        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={16}
          color={Colors.muted}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.list}>
          {freebies.map((freebie) => (
            <FreebieTimelineRow key={freebie.id} freebie={freebie} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.light,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 10,
  },
  iconBadge: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.brandBold,
    color: Colors.dark,
  },
  progress: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  progressText: {
    fontSize: 13,
    color: Colors.muted,
    fontWeight: "500",
  },
  progressDone: {
    color: "#10B981",
  },
  list: {
    paddingHorizontal: 14,
    paddingBottom: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.light,
    paddingTop: 8,
  },
});

export default FreebieGroup;
