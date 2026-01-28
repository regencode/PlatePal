import { View, Text } from "react-native";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";

export default function Onboarding() {
    const router = useRouter();

    const handleNext = () => {
        router.push("/onboarding/goals")
    }
    return (
        <View className="pt-safe flex flex-col w-full h-full items-center justify-center">
            <View className="w-[85%] pb-8">     
                <Text className="text-5xl font-condensed-inconsolata-bold w-full">
                    Before we start, we want to know more about you
                </Text>
            </View>
            <View className="w-[85%] gap-4">     
                <View>
                    <Text className="text-lg">Height (cm)</Text>
                    <CustomInputField 
                    placeholder="Enter your height in cm..." className="h-[45px] rounded-md" 
                    />
                </View>
                <View>
                    <Text className="text-lg">Weight (kg)</Text>
                    <CustomInputField 
                    placeholder="Enter your weight in kg..." className="h-[45px] rounded-md" 
                    />
                </View>
                <CustomButton 
                text="Continue"
                className="w-full h-[45px] rounded-md bg-green-500"
                onPress={() => handleNext()} />
            </View>
            <View className="h-48" />
        </View>
    )
}


