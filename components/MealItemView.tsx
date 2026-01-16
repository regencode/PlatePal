import { MealItem } from "@/types/Meal";
import { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native"

export enum State {
    LOADING,
    READY,
}

export interface MealItemProps {
    name? : string;
    imageSrc?: string;
    dateAdded?: string;
    data: MealItem;
}
export const MealItemView = ({
    name = "Food Name",
    dateAdded = "09:00 am",
    ...props
}: MealItemProps) => {
    const [isReady, setIsReady] = useState(false)
    const [state, setState] = useState()
    useEffect(() => {
        setIsReady(true);
    }, [])
    return (
        <TouchableOpacity 
        className="flex flex-row w-full h-24 justify-between">
            {props.imageSrc ? <Image /> : <View className="bg-black h-full aspect-square"/>}
            { isReady && props.data &&
                <>
                <View className="flex-grow px-3">
                    <Text>{name}</Text>
                    <Text>{dateAdded}</Text>
                </View>
                <View className="text-center">
                    <Text>Calories:</Text>
                    <Text>{props.data.calories_kcal}</Text>
                </View>
                </>
            }
        </TouchableOpacity>
    )
}
