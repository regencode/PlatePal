import { Text, View, TouchableOpacity } from "react-native";
import CustomInputField from "@/components/CustomInputField";
import { CustomHeader } from "@/components/CustomHeader";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { useEffect, useState } from "react";
import { MealAPI } from "@/api/MealAPI";

export default function addMeal() {
    const router = useRouter()
    const [mealName, setMealName] = useState<string>("Lunch");

    const handleAddMeal = async () => {
        try {
            const { data } = await MealAPI.createMeal({
                name: mealName,
            }); 
            router.replace("/app/(tabs)/dashboard");
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <View>
            <StatusBar style="light" />
            <View className="pt-safe bg-white">
                <View className="h-full w-full">
                    <View className="relative z-10 android:elevation-10">
                        <CustomHeader headerText="Create meal" onBackPress={() => router.back()} />
                    </View>
                    <View className="h-6" />
                    <View className="h-full w-[85%] flex flex-col items-center mx-auto gap-5">
                        <View className="w-full">
                            <Text className="text-2xl font-inter-bold py-2">Meal name</Text>
                            <CustomInputField placeholder="Lunch" 
                            value={mealName}
                            className="h-[45px] rounded-md" 
                            onChangeText={(text: string) => setMealName(text)}
                            />
                        </View>
                            <CustomButton 
                            text="Add meal"
                            className="w-full h-12"
                            onPress={() => handleAddMeal()}
                            />
                    </View>
                </View>
            </View>
        </View>
    )
}

