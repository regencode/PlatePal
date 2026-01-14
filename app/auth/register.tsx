import { TouchableOpacity, Text, View, Image, StyleSheet, TextInput } from "react-native";
import CustomInputField from "@/components/CustomInputField";
import { useRouter } from "expo-router";
import "@/global.css";
import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { AuthAPI } from "@/api/AuthAPI";

const styles = StyleSheet.create({
  platepal_logo: {
    width: 100,
    height: 100,
  },
});
export default function Register() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState<string | null>(null);

    const register = async () => {
        if(!email || !password) {
            setError("Email or password must not be blank!");
            return;
        };
        if(password != confirmPassword) {
            setError("Passwords must match!"); 
            return;
        };
        try {
            const { data } = await AuthAPI.register({
                name: name,
                email: email,
                password: password,
            })

            //todo: save token

            // go to dashboard
            router.replace("/app/(tabs)/dashboard");
        }
        catch(err: any) {
            console.log("Login failed",
            err.response?.data?.message ?? "Invalid credentials")
        }
    } 
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
            <View className="w-[85%]">
                <Text className="text-lg">Name</Text>
                <CustomInputField placeholder="Enter your name..." className="h-[45px] rounded-md" value={name} onChangeText={(text: string) => setName(text)}/>
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
                <Text className="text-lg">Confirm Password</Text>
                <CustomInputField placeholder="Re-enter password..." className="h-[45px] rounded-md" value={confirmPassword} secureTextEntry={true} onChangeText={(text: string) => setConfirmPassword(text)}/>
            </View>
            <View className="w-[85%]">
                <Text className="text-red-500">{error}</Text>
            </View>
            <CustomButton 
            text="Register"
            className="w-[85%] h-[45px] rounded-md bg-green-500 py-3"
            onPress={() => register()} />
            <View className="w-full h-[10%]" />
        </View>
    );
}


