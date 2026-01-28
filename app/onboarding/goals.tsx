import { View, Text, TouchableOpacity } from "react-native";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";

export default function Goals() {
    const router = useRouter();

    const handleNext = () => {
    }
    return (
        <View className="pt-safe flex flex-col w-full h-full items-center justify-center">
            <View className="w-[85%] pb-8">     
                <Text className="text-5xl font-condensed-inconsolata-bold w-full">
                    What is your current fitness goal?
                </Text>
            </View>
            <View className="w-[85%] gap-4">     
            <TouchableOpacity
            className={`bg-green-600 rounded-full justify-center items-center`}
            activeOpacity={0.8}
            >
                <Text className="text-white text-sm font-inter-semibold">
                    Weight loss
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
            className={`bg-green-600 rounded-full justify-center items-center`}
            activeOpacity={0.8}
            >
                <Text className="text-white text-sm font-inter-semibold">
                    Maintain
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
            className={`bg-green-600 rounded-full justify-center items-center`}
            activeOpacity={0.8}
            >
                <Text className="text-white text-sm font-inter-semibold">
                    Muscle gain 
                </Text>
            </TouchableOpacity>
            <CustomButton 
            text="Continue"
            className="w-full h-[45px] rounded-md bg-green-500"
                onPress={() => handleNext()} />
            </View>
            <View className="h-48" />
        </View>
    )
}


