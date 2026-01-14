import { View, Image, Text, ScrollView } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { LlmAPI } from "@/api/LlmAPI";
import { CustomHeader } from "@/components/CustomHeader";

interface foodData {
    food_name: string, 
    calories_kcal: number;
    estimated_portion_g: number;
    macronutrients: {
        carbohydrates_g: number, 
        fat_g: number, 
        protein_g: number 
    }, 
    micronutrients: {
        fiber_g: number, 
        sodium_mg: number, 
        sugar_g: number
    }
    confidence: number;
}

export default function Process() {
    const { uri } = useLocalSearchParams<{uri: string}>();
    const router = useRouter();
    const [data, setData] = useState<foodData | null>(null)
    const query = async (imageUri: string) => {
        const body = {
            "text": "You are an AI assistant specialized in food recognition and nutritional analysis.\n\nYou MUST respond using ONLY valid JSON.\nDo NOT include explanations, markdown, comments, or extra text.\nDo NOT wrap the JSON in code fences.\n\nRules:\n- Output must be valid JSON that can be parsed by `JSON.parse()`\n- Use double quotes for all keys and string values\n- Do not include trailing commas\n- Do not include undefined fields\n- All numeric values must be numbers (not strings)\n- Use grams (g), milliliters (ml), milligrams (mg), and kilocalories (kcal) as units\n- Base estimates on standard food composition databases (e.g., USDA or equivalent)\n- If portion size is uncertain, make a reasonable visual estimate and mark confidence\n- Follow the schema exactly\n\nIf the food cannot be identified or nutrition cannot be reliably estimated, return:\n{\n  \"error\": \"unable_to_estimate_nutrition\"\n}\n\nJSON schema:\n{\n  \"food_name\": \"string\",\n  \"estimated_portion\": {\n    \"amount\": \"number\",\n    \"unit\": \"string\"\n  },\n  \"calories_kcal\": \"number\",\n  \"macronutrients\": {\n    \"protein_g\": \"number\",\n    \"fat_g\": \"number\",\n    \"carbohydrates_g\": \"number\"\n  },\n  \"micronutrients\": {\n    \"fiber_g\": \"number\",\n    \"sugar_g\": \"number\",\n    \"sodium_mg\": \"number\"\n  },\n \"confidence\": \"number\"\n}",
            "encodedImage": imageUri,
        }
        const res = await LlmAPI.query(body);
        setData(res.data.data);
    }
    useEffect(() => {
        // process uri
        query(uri);
    }, [])

    useEffect(() => {
        // process uri
        console.log("Data updated:", data);
    }, [data])

    if (!data) {
      return <Text>Loading...</Text>;
    }
    return (
        <ScrollView>
        <View className="p-safe h-full w-full">
            <View className="relative z-10 android:elevation-10">
                <CustomHeader 
                theme="light"
                headerText="Add meal" onBackPress={() => router.push("/app/(tabs)/dashboard")} />
            </View>
            <View className="flex flex-col h-full w-full items-center"> 
                <View className="w-full aspect-square overflow-hidden bg-black">
                <Image
                source={{ uri }}
                style={{ width: "100%", height: "100%"}}
                />
                </View>
                <View className="flex flex-col w-[80%]">
                    {data && 
                    <>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Confidence 
                        </Text>
                        <Text>
                            {data.confidence*100}/100
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Calories
                        </Text>
                        <Text>
                            {data.calories_kcal} kcal
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Estimated portion
                        </Text>
                        <Text>
                            {data.estimated_portion_g}g
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Calorie density 
                        </Text>
                        <Text>
                            {(data.calories_kcal / data.estimated_portion_g).toFixed(2)}kcal/g
                        </Text>
                    </View>
                    <Text> Macronutrients </Text>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Carbohydrates
                        </Text>
                        <Text>
                            {data.macronutrients.carbohydrates_g}g
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Protein
                        </Text>
                        <Text>
                            {data.macronutrients.protein_g}g
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Fat 
                        </Text>
                        <Text>
                            {data.macronutrients.fat_g}g
                        </Text>
                    </View>
                    <Text> Micronutrients </Text>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Fiber 
                        </Text>
                        <Text>
                            {data.micronutrients.fiber_g}g
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Sodium 
                        </Text>
                        <Text>
                            {data.micronutrients.sodium_mg}mg
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Sugar
                        </Text>
                        <Text>
                            {data.micronutrients.sugar_g}g
                        </Text>
                    </View>
                    </>
                    }
                </View>
            </View>
        </View>
        </ScrollView>
    )
}

