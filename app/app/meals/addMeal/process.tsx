import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { CustomHeader } from "@/components/CustomHeader";
import { ImageUploadAPI } from "@/api/ImageUploadAPI";
import { MealAPI } from "@/api/MealAPI";
import type { MealItem } from "@/types/MealItem";



export default function Process() {
    const { mealId, uri } = useLocalSearchParams<{mealId: string, uri: string}>();
    const router = useRouter();
    const [mealData, setMealData] = useState<MealItem | null>(null)
    const [confidence, setConfidence] = useState<number>(0);
    const query = async (imageUri: string) => {
        try {
            const { data } =  (await ImageUploadAPI.uploadAndQueryLLM(imageUri))!;
            setConfidence(data.confidence);
            setMealData(data.data);
            const res = await MealAPI.createMealItem(parseInt(mealId), mealData);
            console.log(res);
        }
        catch (e) {
            throw e;
        }
    }

    const handleComplete = async () => {
        router.replace("/app/(tabs)/dashboard")
    }

    useEffect(() => {
        // process uri
        query(uri);
    }, [])

    if (!mealData) {
      return <Text>Loading...</Text>;
    }
    return (
        <ScrollView>
        <View className="p-safe h-full w-full">
            <View className="relative z-10 android:elevation-10">
                <CustomHeader 
                theme="light"
                headerText="Meal information" onBackPress={() => router.push("/app/(tabs)/dashboard")} />
            </View>
            <View className="flex flex-col h-full w-full items-center gap-2"> 
                <View className="w-full aspect-square overflow-hidden bg-black">
                    <Image
                    source={{ uri }}
                    style={{ width: "100%", height: "100%"}}
                    />
                </View>
                <View className="flex flex-col w-[80%] gap-2">
                    {mealData && 
                    <>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Confidence 
                        </Text>
                        <Text>
                            {confidence*100}/100
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Calories
                        </Text>
                        <Text>
                            {mealData.calories_kcal} kcal
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Estimated portion
                        </Text>
                        <Text>
                            {mealData.estimated_portion_g}g
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Calorie density 
                        </Text>
                        <Text>
                            {(mealData.calories_kcal / mealData.estimated_portion_g).toFixed(2)}kcal/g
                        </Text>
                    </View>
                    <Text> Macronutrients </Text>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Carbohydrates
                        </Text>
                        <Text>
                            {mealData.carbohydrates_g}g
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Protein
                        </Text>
                        <Text>
                            {mealData.protein_g}g
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Fat 
                        </Text>
                        <Text>
                            {mealData.fat_g}g
                        </Text>
                    </View>
                    <Text> Micronutrients </Text>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Fiber 
                        </Text>
                        <Text>
                            {mealData.fiber_g}g
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Sodium 
                        </Text>
                        <Text>
                            {mealData.sodium_mg}mg
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Sugar
                        </Text>
                        <Text>
                            {mealData.sugar_g}g
                        </Text>
                    </View>
                    </>
                    }
                    <View className="w-full flex flex-row gap-4 justify-between">
                        <View className="h-36" />
                        <TouchableOpacity 
                        onPress={() => router.replace("/app/meals/addMeal")}
                        className="flex-1 h-full aspect-[2/1] bg-white align-middle items-center justify-center rounded-xl">
                        <Ionicons
                        name="refresh-circle"
                        size={32}
                        className="justify-center"
                        />
                        <Text>Add another meal...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => handleComplete()}
                        className="flex-1 h-full aspect-[2/1] bg-white align-middle items-center justify-center rounded-xl">
                        <Ionicons
                        name="arrow-redo"
                        size={32}
                        className="justify-center"
                        />
                        <Text>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        </ScrollView>
    )
}

