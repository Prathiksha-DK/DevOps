import { Tabs } from "expo-router";
import TopNav from "../components/top-nav";

export default function TabLayout() {
  return (
    <>
      <TopNav />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="explore" />
        <Tabs.Screen name="contractorhome" />
      </Tabs>
    </>
  );
}
