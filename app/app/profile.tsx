import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import { AuthAPI } from "@/api/AuthAPI";
import { Router, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function Profile() {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            const res = await AuthAPI.logout();
            await SecureStore.deleteItemAsync("accessToken");
            await SecureStore.deleteItemAsync("refreshToken");
            router.replace("/");
        }
        catch(e) {
            console.log(e);
        }
    }
    return (
        <View className="flex items-center justify-center h-[100%] gap-5">
            <Text>Coming soon!</Text>
            <TouchableOpacity onPress={() => handleLogout()}>
                <Text>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    );
}

