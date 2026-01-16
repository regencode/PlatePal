import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { LlmAPI } from "@/api/LlmAPI";
import { CustomHeader } from "@/components/CustomHeader";
import { MealAPI } from "@/api/MealAPI";
import type { MealItem } from "@/types/MealItem";



export default function Process() {
    const { mealId, uri } = useLocalSearchParams<{mealId: string, uri: string}>();
    const router = useRouter();
    const [mealData, setMealData] = useState<MealItem | null>(null)
    const [confidence, setConfidence] = useState<number>(0);
    const query = async (imageUri: string) => {
        try {
            const body = {
                "text": "You are an AI assistant specialized in food recognition and nutritional analysis.\n\nYou MUST respond using ONLY valid JSON.\nDo NOT include explanations, markdown, comments, or extra text.\nDo NOT wrap the JSON in code fences.\n\nRules:\n- Output must be valid JSON that can be parsed by `JSON.parse()`\n- Use double quotes for all keys and string values\n- Do not include trailing commas\n- Do not include undefined fields\n- All numeric values must be numbers (not strings)\n- Use grams (g), milliliters (ml), milligrams (mg), and kilocalories (kcal) as units\n- Base estimates on standard food composition databases (e.g., USDA or equivalent)\n- If portion size is uncertain, make a reasonable visual estimate and mark confidence\n- Follow the schema exactly\n\nIf the food cannot be identified or nutrition cannot be reliably estimated, return:\n{\n  \"error\": \"unable_to_estimate_nutrition\"\n}\n\nJSON schema:\n{\n  \"food_name\": \"string\",\n  \"estimated_portion\": {\n    \"amount\": \"number\",\n    \"unit\": \"string\"\n  },\n  \"calories_kcal\": \"number\",\n  \"macronutrients\": {\n    \"protein_g\": \"number\",\n    \"fat_g\": \"number\",\n    \"carbohydrates_g\": \"number\"\n  },\n  \"micronutrients\": {\n    \"fiber_g\": \"number\",\n    \"sugar_g\": \"number\",\n    \"sodium_mg\": \"number\"\n  },\n \"confidence\": \"number\"\n}",
                "encodedImage": imageUri,
            }
            let { data } = await LlmAPI.query(body);
            setConfidence(data.confidence);
            setMealData(data.data);
            const res = await MealAPI.createMealItem(parseInt(mealId), mealData);
            console.log(res);
        }
        catch (e) {
            console.log(e);
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

