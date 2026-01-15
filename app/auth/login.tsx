import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import CustomInputField from "@/components/CustomInputField";
import { useRouter } from "expo-router";
import "@/global.css";
import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { AuthAPI } from "@/api/AuthAPI";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { setAccessToken, getAccessToken, storeRefreshToken, getRefreshToken } from "@/api/client";

const styles = StyleSheet.create({
  platepal_logo: {
    width: 75,
    height: 75,
  },
});
export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)

    const login = async () => {
        setError(null);
        if(!email || !password) {
            setError("Email or password must not be blank!");
            return;
        };
        try {
            await AuthAPI.login({
                email: email,
                password: password,
            })
            // go to dashboard
            router.replace("/app/(tabs)/dashboard");
        }
        catch(err: any) {
            console.log(err);
            setError(err.response?.data?.message ?? "Invalid credentials")
        }
    } 

    useEffect(() => {
        console.log("email", email);
        console.log("password", password);

    }, [password, email])

    return (
        <View className="flex items-center h-[90%] gap-4 justify-center">
            <View className="flex items-center">
                <Image style={styles.platepal_logo}
                source={require("@/assets/images/platepal-logo.png")} />
                <Text className="text-5xl font-condensed-inconsolata-bold text-center pb-1">Welcome Back</Text>
                <Text className="text-lg font-inter">Please sign in to continue</Text>
            </View>
            <View className="w-[85%]">
                <Text className="text-lg">Email</Text>
                <CustomInputField placeholder="your@email.com" className="h-[45px] rounded-md" value={email} onChangeText={(text: string) => setEmail(text)}/>
            </View>
            <View className="w-[85%]">
                <Text className="text-lg">Password</Text>
                <CustomInputField placeholder="Enter your password..." className="h-[45px] rounded-md" value={password} secureTextEntry={true} onChangeText={(text: string) => setPassword(text)}/>
            </View>
            <View className="w-[85%]">
                <Text className="text-red-500">{error}</Text>
            </View>
            <CustomButton 
            text="Login"
            className="w-[85%] h-[45px] rounded-md bg-green-500"
            onPress={() => login()} />
            <Text> or continue with </Text>
            <TouchableOpacity
            className="flex flex-row gap-3 w-[85%] h-[45px] bg-white border border-black rounded-md justify-center items-center"
            activeOpacity={0.8}
            >
                <Ionicons 
                name="logo-google"
                />
                <Text className="text-black text-sm font-inter-semibold">
                Continue with Google
                </Text>
            </TouchableOpacity>
            <Text> Don't have an account?{" "}
                <Text
                style={{ color: "green" }}
                onPress={() => router.push("/auth/register")}>
                    Sign Up
                </Text>
            </Text>
            <View className="w-full h-[10%]" />
        </View>
    );
}


