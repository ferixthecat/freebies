import { Colors, Fonts } from "@/constants/theme";
import { Restaurant } from "@/data/businesses";
import { useClaimedFreebiesStore } from "@/hooks/use-claimedfreebies";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface ClaimProgressCardProps {
  allFreebies: Restaurant[];
  daysUntil: number;
  claimableToday: Restaurant[];
}

const ClaimProgressCard = ({
  allFreebies,
  daysUntil,
  claimableToday,
}: ClaimProgressCardProps) => {
  const claimedFreebies = useClaimedFreebiesStore(
    (state) => state.claimedFreebies,
  );

  const currentYear = new Date().getFullYear();
  const claimedCount = allFreebies.filter((f) =>
    claimedFreebies.includes(`${f.id}_${currentYear}`),
  ).length;
  const total = allFreebies.length;
  const progress = total > 0 ? claimedCount / total : 0;
  const allClaimed = claimedCount === total && total > 0;
  const isActivePeriod = daysUntil <= 31;
  const isBirthdayWeek = daysUntil <= 7;
  const isBirthdayToday = daysUntil === 0;

  // Don't show if birthday is far away and nothing claimed yet
  if (!isActivePeriod && claimedCount === 0) return null;

  if (allClaimed) {
    return (
      <Animated.View entering={FadeInDown} style={styles.celebrationCard}>
        <Text style={styles.celebrationEmoji}>🎉</Text>
        <Text style={styles.celebrationTitle}>All Freebies Claimed!</Text>
        <Text style={styles.celebrationSubtitle}>
          You claimed all {total} birthday freebies. Happy Birthday!
        </Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeInDown} style={styles.card}>
      {/* Header row */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons
            name="gift"
            size={18}
            color={isBirthdayToday ? "#EF4444" : Colors.secondary}
          />
          <Text style={styles.title}>
            {isBirthdayToday
              ? "Claim your freebies today!"
              : isBirthdayWeek
                ? "Your birthday is this week"
                : "Birthday coming up"}
          </Text>
        </View>
        <Text style={styles.fraction}>
          <Text style={styles.fractionClaimed}>{claimedCount}</Text>
          <Text style={styles.fractionTotal}>/{total}</Text>
        </Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: `${progress * 100}%` as any,
              backgroundColor: isBirthdayToday ? "#EF4444" : Colors.secondary,
            },
          ]}
        />
      </View>

      <Text style={styles.subtitle}>
        {claimedCount === 0
          ? `${total} freebies ready to plan`
          : `${total - claimedCount} remaining to claim`}
      </Text>

      {/* Claimable now section */}
      {claimableToday.length > 0 && (
        <View style={styles.claimableSection}>
          <View style={styles.claimableHeader}>
            <View style={styles.claimableDot} />
            <Text style={styles.claimableTitle}>Available to claim now</Text>
          </View>
          <View style={styles.claimableChips}>
            {claimableToday.slice(0, 3).map((f) => {
              const isClaimed = claimedFreebies.includes(
                `${f.id}_${currentYear}`,
              );
              return (
                <View
                  key={f.id}
                  style={[
                    styles.claimableChip,
                    isClaimed && styles.claimableChipDone,
                  ]}
                >
                  {isClaimed && (
                    <Ionicons name="checkmark" size={11} color="#10B981" />
                  )}
                  <Text
                    style={[
                      styles.claimableChipText,
                      isClaimed && styles.claimableChipTextDone,
                    ]}
                    numberOfLines={1}
                  >
                    {f.name}
                  </Text>
                </View>
              );
            })}
            {claimableToday.length > 3 && (
              <View style={styles.claimableChip}>
                <Text style={styles.claimableChipText}>
                  +{claimableToday.length - 3} more
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontFamily: Fonts.brandBold,
    color: Colors.dark,
    flex: 1,
  },
  fraction: {
    fontSize: 18,
    fontFamily: Fonts.brandBlack,
  },
  fractionClaimed: {
    color: Colors.secondary,
  },
  fractionTotal: {
    color: Colors.muted,
  },
  progressTrack: {
    height: 6,
    backgroundColor: Colors.primaryLight,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.muted,
  },

  // Claimable now
  claimableSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.primaryLight,
    paddingTop: 10,
    gap: 8,
  },
  claimableHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  claimableDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  claimableTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10B981",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  claimableChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  claimableChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  claimableChipDone: {
    backgroundColor: "#D1FAE5",
  },
  claimableChipText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.secondary,
    maxWidth: 100,
  },
  claimableChipTextDone: {
    color: "#10B981",
    textDecorationLine: "line-through",
  },

  // Celebration
  celebrationCard: {
    backgroundColor: "#FEF9C3",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FDE047",
    alignItems: "center",
    gap: 6,
  },
  celebrationEmoji: {
    fontSize: 40,
  },
  celebrationTitle: {
    fontSize: 20,
    fontFamily: Fonts.brandBlack,
    color: Colors.dark,
  },
  celebrationSubtitle: {
    fontSize: 14,
    color: Colors.muted,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default ClaimProgressCard;
