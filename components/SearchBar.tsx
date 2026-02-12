import { Colors } from "@/constants/theme";
import { useFilterStore } from "@/hooks/useFilterStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useFilterStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleClear = () => {
    setLocalQuery("");
    setSearchQuery("");
  };

  const handleChangeText = (text: string) => {
    setLocalQuery(text);
    // Debouncing would go here in production
    setSearchQuery(text);
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={18}
        color={Colors.muted}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder="Search freebies..."
        placeholderTextColor={Colors.muted}
        value={localQuery}
        onChangeText={handleChangeText}
        returnKeyType="search"
        clearButtonMode="never"
      />
      {localQuery.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={18} color={Colors.muted} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.dark,
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;
