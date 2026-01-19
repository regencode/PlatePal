import { MealItem } from "@/types/Meal";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native"

export enum State {
    LOADING,
    READY,
}

export interface MealItemProps {
    data: MealItem;
    name? : string;
    imageSrc?: string;
    dateAdded?: string;
    onLongPress?: () => any,
    onPress?: () => any,
}
export const MealItemView = ({
    name = "Food Name",
    dateAdded = "09:00 am",
    ...props
}: MealItemProps) => {
    const [isReady, setIsReady] = useState(false)
    useEffect(() => {
        setIsReady(true);
    }, [])
    return (
        <TouchableOpacity 
        className="flex flex-row w-full h-24 justify-between"
        onPress={props.onPress}
        onLongPress={props.onLongPress}
        >
            {props.imageSrc ? <Image /> : <View className="bg-black h-full aspect-square"/>}
            { isReady && props.data &&
                <>
                <View className="px-2 flex-1 flex-grow">
                    <Text 
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    className="font-condensed-inconsolata-bold text-center">{name}</Text>
                </View>
                <View className="text-center w-fit">
                    <Text className="text-sm font-condensed-inconsolata-bold text-center">Calories:</Text>
                    <Text className="text-xl font font-condensed-inconsolata-medium text-center">{props.data.calories_kcal}</Text>
                </View>
                </>
            }
        </TouchableOpacity>
    )
}
