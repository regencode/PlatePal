import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true, }}>
      <StatusBar style="dark" />
      <Tabs.Screen name="aichat" options={{ title: "AI Chat", headerShown: false }} />
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard", headerShown: false }} />
      <Tabs.Screen name="gallery" options={{ title: "Gallery", headerShown: false }} />
    </Tabs>
  );
}
