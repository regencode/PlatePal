import { TouchableOpacity, Text, View, Image, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import "@/global.css";
import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";

const styles = StyleSheet.create({
  platepal_logo: {
    width: 100,
    height: 100,
  },
});
export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        console.log("email", email);
    }, [email])

    useEffect(() => {
        console.log("password", password);
    }, [password])

    return (
        <View className="flex items-center justify-center h-[100%] gap-5">
            <Image style={styles.platepal_logo}
            source={require("@/assets/images/platepal-logo.png")} />
            <Text className="text-5xl">Login</Text>

            <Text className="text-xl">Email</Text>
            <TextInput className="border border-black" onChange={(e) => setEmail(e.target.value)}/>

            <Text className="text-xl">Password</Text>
            <TextInput className="border border-black" onChange={(e) => setPassword(e.target.value)}/>
            <CustomButton 
            text="Login"
            onPress={() => router.push("/(tabs)/dashboard")} />
            <CustomButton 
            text="Register"
            onPress={() => router.push("/auth/register")} />
        </View>
    );
}


