import { Colors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

interface SettingRowProps {
  icon?: string;
  iconColor?: string;
  label: string;
  value?: string;
  description?: string;
  onPress?: () => void;
  showChevron?: boolean;
  toggle?: {
    value: boolean;
    onChange: (val: boolean) => void;
  };
  danger?: boolean;
  indent?: boolean; // for nested settings under a toggle
}

const SettingRow = ({
  icon,
  iconColor = Colors.secondary,
  label,
  value,
  description,
  onPress,
  showChevron = false,
  toggle,
  danger = false,
  indent = false,
}: SettingRowProps) => {
  const labelColor = danger ? "#EF4444" : Colors.dark;

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      disabled={!onPress && !toggle}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {/* Icon or indent spacer */}
      {icon ? (
        <View
          style={[styles.iconContainer, danger && styles.iconContainerDanger]}
        >
          <Ionicons
            name={icon as any}
            size={20}
            color={danger ? "#EF4444" : iconColor}
          />
        </View>
      ) : (
        <View style={indent ? styles.iconPlaceholder : undefined} />
      )}

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
        {value && <Text style={styles.value}>{value}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}
      </View>

      {/* Right element: chevron or toggle */}
      {toggle ? (
        <Switch
          value={toggle.value}
          onValueChange={toggle.onChange}
          trackColor={{ false: Colors.light, true: Colors.primary }}
          thumbColor="#fff"
        />
      ) : showChevron ? (
        <Ionicons name="chevron-forward" size={20} color={Colors.muted} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.light,
    minHeight: 52,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconContainerDanger: {
    backgroundColor: "#FEE2E2",
  },
  iconPlaceholder: {
    width: 44,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.dark,
  },
  value: {
    fontSize: 14,
    color: Colors.muted,
    marginTop: 2,
  },
  description: {
    fontSize: 13,
    color: Colors.muted,
    marginTop: 2,
    lineHeight: 18,
  },
});

export default SettingRow;
