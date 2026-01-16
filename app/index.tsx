import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { useTheme } from "@/theme";
import { useFonts } from "expo-font";
import { HealthAPI } from "@/api/HealthAPI";
import * as SecureStore from "expo-secure-store";
import "@/global.css";
import { AuthAPI } from "@/api/AuthAPI";
import { setAccessToken, storeRefreshToken } from "@/api/client";
import { use, useEffect, useState } from "react";

const styles = StyleSheet.create({
  platepal_logo: {
    width: 300,
    height: 300,
  },
});

export default function Index() {
    const router = useRouter()
    const { mode, theme, setTheme } = useTheme()
    const [ ready, setReady ] = useState(false);

    const [loaded] = useFonts({
        InterRegular: require("../assets/fonts/Inter_18pt-Regular.ttf"),
        InterBold: require("../assets/fonts/Inter_18pt-Bold.ttf"),
        InterSemiBold: require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
        InconsolataMedium: require("../assets/fonts/Inconsolata-Medium.ttf"),
        InconsolataRegular: require("../assets/fonts/Inconsolata-Regular.ttf"),
        InconsolataSemiBold: require("../assets/fonts/Inconsolata-SemiBold.ttf"),
        CondensedInconsolataMedium: require("../assets/fonts/Inconsolata_Condensed-Medium.ttf"),
        CondensedInconsolataRegular: require("../assets/fonts/Inconsolata_Condensed-Regular.ttf"),
        CondensedInconsolataSemiBold: require("../assets/fonts/Inconsolata_Condensed-SemiBold.ttf"),
        CondensedInconsolataBold: require("../assets/fonts/Inconsolata_Condensed-Bold.ttf"),
    })
    const redirectToHomePage = async () => {
        try {
            const { data } = await AuthAPI.refresh();
            setAccessToken(data.accessToken);
            await storeRefreshToken(data.refreshToken);
            router.replace("/app/(tabs)/dashboard")
            setReady(true);
        }
        catch (e) {
            console.log(e);
            setReady(true);
        }
    }
    useEffect(() => {
        redirectToHomePage(); 
    }, [])
  
    if (!loaded || !ready) return null;
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

