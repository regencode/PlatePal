import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/theme";
import "@/global.css";

const styles = StyleSheet.create({
  platepal_logo: {
    width: 300,
    height: 300,
  },
});

export default function Index() {
    const router = useRouter()
    const { mode, theme, setTheme } = useTheme()
    console.log(theme)
    return (
        <View 
        className="flex items-center justify-center h-[100%] gap-5"
        style={{ backgroundColor: theme.primary.light }}
        >
            <Text className="text-5xl">PlatePal</Text>
            <Image style={styles.platepal_logo}
            source={require("@/assets/images/platepal-logo.png")} />
            <TouchableOpacity 
            onPress={() => router.push("/auth/login")}
            className="border border-black w-[30%]">
                <Text className="text-2xl text-center">Start</Text>
            </TouchableOpacity>

        </View>
    );
}

