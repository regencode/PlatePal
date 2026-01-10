import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { useTheme } from "@/theme";
import { useFonts } from "expo-font";
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
    const [loaded] = useFonts({
        InterRegular: require("../assets/fonts/Inter/Inter_18pt-Regular.ttf"),
        InterBold: require("../assets/fonts/Inter/Inter_18pt-Bold.ttf"),
        InterSemiBold: require("../assets/fonts/Inter/Inter_18pt-SemiBold.ttf"),
    })
  
    if (!loaded) return null;
    return (
        <View 
        className="flex items-center justify-center h-[100%] gap-5"
        style={{ backgroundColor: theme.primary.light }}
        >
            <Text className="text-5xl">PlatePal</Text>
            <Image style={styles.platepal_logo}
            source={require("@/assets/images/platepal-logo.png")} />
            <CustomButton text="Start" 
            className="w-[70%] h-[50px]"
            onPress={() => router.push("/auth/login")}/>

        </View>
    );
}

