import { TouchableOpacity, Text, View, Image, StyleSheet, TextInput } from "react-native";
import CustomInputField from "@/components/CustomInputField";
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
export default function Register() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        console.log("email", email);
    }, [email])

    useEffect(() => {
        console.log("password", password);
    }, [password])

    return (
        <View className="flex items-center justify-center h-[100%] gap-5">
            <View>
                <Image className="mx-auto" style={styles.platepal_logo}
                source={require("@/assets/images/platepal-logo.png")} />
                <Text className="text-lg font-inter">Please register to continue</Text>
            </View>
            <View className="w-[75%]">
                <Text className="text-lg">Email</Text>
                <CustomInputField onChange={(e) => setEmail(e.target.value)}/>
            </View>
            <View className="w-[75%]">
                <Text className="text-lg">Password</Text>
                <CustomInputField onChange={(e) => setPassword(e.target.value)}/>
            </View>
            <View className="w-[75%]">
                <Text className="text-lg">Confirm Password</Text>
                <CustomInputField onChange={(e) => setConfirmPassword(e.target.value)}/>
            </View>
            <CustomButton 
            text="Register"
            className="w-[70%] h-[50px]"
            onPress={() => router.push("/(tabs)/dashboard")} />
        </View>
    );
}


