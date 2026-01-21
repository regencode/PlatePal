import { Stack } from "expo-router";
import { ThemeProvider } from "@/theme";
import { StatusBar } from "expo-status-bar";
import { ModalProvider } from "@/contexts/ModalContext";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <ModalProvider>
                <StatusBar style="dark" />
                <Stack screenOptions={{ headerShown: false, }}/>
            </ModalProvider>
        </ThemeProvider>
    );
}
