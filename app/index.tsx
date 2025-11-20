import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import "@/global.css";

const styles = StyleSheet.create({
  platepal_logo: {
    width: 300,
    height: 300,
  },
});
export default function Index() {
    const router = useRouter()
    return (
        <View className="flex items-center justify-center h-[100%] gap-5">
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

