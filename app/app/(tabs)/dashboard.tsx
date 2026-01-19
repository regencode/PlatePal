import { View, ScrollView, Text } from "react-native";
import Widget from "@/components/Widget";
import "@/global.css";
import Dropdown from "@/components/Dropdown";
import { CustomHeader } from "@/components/CustomHeader";
import WidgetCounter from "@/components/WidgetCounter";
import WidgetBar from "@/components/WidgetBar";
import { useEffect, useState } from "react";
import { MealItemView } from "@/components/MealItemView";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useLocalSearchParams } from "expo-router";
import { HealthAPI } from "@/api/HealthAPI";
import { MealAPI } from "@/api/MealAPI";
import { Loading } from "@/components/Loading";
import type { Meal } from "@/types/Meal";
import type { MealItem } from "@/types/MealItem";



const checkConnectivity = async () => {
    const res = await HealthAPI.health();
    console.log(res.status);
    return res;
}

export default function Dashboard() {
    const [calories, setCalories] = useState(0);
    const [calorieLimit, setCalorieLimit] = useState(0);
    const [meals, setMeals] = useState<Meal[]>([])
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchMealItemsFromMeal = async (meal: Meal) => {
        return await MealAPI.getMealItemsFromMeal(meal.id);
    }
    const handleAddMealItem = (mealId: number) => {
        router.push({
            pathname: "/app/meals/addMeal/addMealItem",
            params: { mealId: mealId.toString() }
        })
    }

    const fetchMeals = async () => {
        const { data: mealsData } = await MealAPI.getAllMeals();
        // Promise.all runs all promises in parallel and waits until all promises are resolved
        const mealsWithItems = await Promise.all(
            mealsData.map(async (meal : Meal) => {
                let items = (await fetchMealItemsFromMeal(meal)).data;
                return {
                    ...meal,
                    mealItems: items,
                };
            })
        );
        setMeals(mealsWithItems);
    }
    useEffect(() => {
        console.log("API URL:", process.env.EXPO_PUBLIC_BACKEND_URL);
        checkConnectivity();
        setCalorieLimit(2000);
        fetchMeals();
        setLoading(false);
    }, [])

    if (loading) return <Loading />
    return (
        <View className="pt-safe bg-white">
            <View className="relative z-10 android:elevation-10">
                <CustomHeader displayMembership={true} onProfilePress={() => router.push("/app/profile")}/>
            </View>
            <ScrollView>
                <View className="flex flex-col gap-5 items-center h-[100%] w-[90%] pt-5 mx-auto">
                    <View className="w-full">
                        <Text className="text-2xl font-inter-bold text-left"
                        >Today</Text>
                    </View>
                    <Widget widgetTitle="Today's Calories"
                    flexDirection="col">
                        <View className="items-center">
                            <Text className="text-3xl font-inter-bold">{calories}</Text>
                            <Text className="text-md">of {calorieLimit} kcal</Text>
                            <WidgetBar className="py-3" barClassName="h-5" textEnabled={false}/>
                            <Text className="text-md">{calorieLimit - calories} kcal remaining</Text>
                        </View>
                        <WidgetBar textEnabled={true} 
                        title="Protein" 
                        barColor="bg-blue-300"
                        className="py-2" curAmount={50} limitAmount={100}/>
                        <WidgetBar textEnabled={true} 
                        title="Carbs" 
                        barColor="bg-green-300"
                        className="py-2" curAmount={50} limitAmount={100}/>
                        <WidgetBar textEnabled={true} 
                        title="Fat" 
                        barColor="bg-yellow-300"
                        className="py-2" curAmount={50} limitAmount={100}/>
                    </Widget>
                    <View className="h-32 flex flex-col flex-wrap w-full gap-1">
                        <Widget
                        className="h-full aspect-square"
                        widgetTitle="Stats"
                        flexDirection="none"
                        >
                            <WidgetCounter />
                        </Widget>
                        <Widget
                        className="h-full aspect-square"
                        widgetTitle="Stats"
                        >
                            <WidgetCounter />
                        </Widget>
                        <Widget
                        className="h-full aspect-square"
                        widgetTitle="Stats"
                        >
                            <WidgetCounter />
                        </Widget>
                    </View>
                    <View className="flex flex-row justify-between w-full h-12">
                        <Text className="text-2xl font-inter-bold h-full align-middle">
                            Today's Meals
                        </Text>
                        <CustomButton 
                        text="Add meal"
                        className="w-28 h-full"
                        onPress={() => {router.push("/app/meals/addMeal")}}
                        />
                    </View>                     
                    <View className="flex flex-col w-full gap-4">
                        {meals.map(meal => (
                        <Dropdown key={meal.id.toString()} title={meal.name} defaultOpenState={true}
                        onPress={() => handleAddMealItem(meal.id)}
                        >
                            {meal.mealItems.map(mealItem => (
                                <MealItemView
                                key={mealItem.id.toString()} 
                                name={mealItem.food_name} 
                                data={mealItem}
                                onPress={() => router.push(`/app/meals/${mealItem.id.toString()}`)}
                                />
                            ))
                            }
                        </Dropdown>
                        ))}
                    </View>
                </View>
                <View className="h-36"/>
            </ScrollView>
        </View>
    );
}

