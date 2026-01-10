import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true, }}>
      <Tabs.Screen name="aichat" options={{ title: "AI Chat", headerShown: false }} />
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard", headerShown: false }} />
      <Tabs.Screen name="gallery" options={{ title: "Gallery", headerShown: false }} />
    </Tabs>
  );
}
