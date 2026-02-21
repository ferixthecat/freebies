import { Fonts } from "@/constants/theme";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Profile",
          headerLargeTitle: true,
          headerTransparent: true,
          headerLargeTitleStyle: {
            fontFamily: Fonts.brandBold,
            fontWeight: "900",
            color: "#000",
          },
          headerStyle: {
            backgroundColor: "transparent", // ← Add this
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
