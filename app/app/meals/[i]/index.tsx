import { useLocalSearchParams } from "expo-router"
import { View, Text, ScrollView, Image } from "react-native"
import { CustomHeader } from "@/components/CustomHeader";
import { useEffect } from "react";
import { MealAPI } from "@/api/MealAPI";
import { useState } from "react";
import { MealItem } from "@/types/MealItem";
import { useRouter } from "expo-router";


export default function Index() {
    const { i } = useLocalSearchParams();
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);
    const [mealData, setMealItemData] = useState<MealItem>();
    
    const fetchMealItemData = async () => {
        const { data } = await MealAPI.getMealItem(parseInt(i as string));
        setMealItemData(data);
        setIsReady(true);
    }

    useEffect(() => {
        fetchMealItemData();    
    }, [])

    if (!isReady) {
      return <Text>Loading...</Text>;
    }
    return (
        <ScrollView>
        <View className="pt-safe h-full w-full">
            <View className="relative z-10 android:elevation-10">
                <CustomHeader 
                theme="light"
                headerText="Meal information" onBackPress={() => router.push("/app/(tabs)/dashboard")} />
            </View>
            <View className="flex flex-col h-full w-full items-center gap-2"> 
                <View className="w-full aspect-square overflow-hidden bg-black">
                    <Image
                    style={{ width: "100%", height: "100%"}}
                    />
                </View>
                <View className="flex flex-col w-[80%] gap-2">
                    {(!isReady && !mealData) ?
                    <View className="flex flex-col justify-center align-middle h-20">
                        <Text className="w-full text-center"> Loading... </Text>
                    </View>
                    :
                    <>
                    <View className="flex flex-col justify-center bg-white w-full h-20 px-3 rounded-xl">
                        <Text className="text-center font-inter-bold">{mealData!.food_name}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Calories
                        </Text>
                        <Text>
                            {mealData!.calories_kcal} kcal
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Estimated portion
                        </Text>
                        <Text>
                            {mealData!.estimated_portion_g}g
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Calorie density 
                        </Text>
                        <Text>
                            {(mealData!.calories_kcal / mealData!.estimated_portion_g).toFixed(2)}kcal/g
                        </Text>
                    </View>
                    <Text> Macronutrients </Text>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Carbohydrates
                        </Text>
                        <Text>
                            {mealData!.carbohydrates_g}g
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Protein
                        </Text>
                        <Text>
                            {mealData!.protein_g}g
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Fat 
                        </Text>
                        <Text>
                            {mealData!.fat_g}g
                        </Text>
                    </View>
                    <Text> Micronutrients </Text>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Fiber 
                        </Text>
                        <Text>
                            {mealData!.fiber_g}g
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Sodium 
                        </Text>
                        <Text>
                            {mealData!.sodium_mg}mg
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text>
                            Sugar
                        </Text>
                        <Text>
                            {mealData!.sugar_g}g
                        </Text>
                    </View>
                    </>
                    }
                </View>
            </View>
        </View>
        <View className="h-20" />
        </ScrollView>
    )
}

