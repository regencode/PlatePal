import { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native"

export enum State {
    LOADING,
    READY,
}

export interface FoodItemProps {
    name? : string;
    description?: string;
    imageSrc?: string;
    dateAdded?: string;
}
export const FoodItem = ({
    name = "Food Name",
    description = "Food Description",
    dateAdded = "09:00 am",
    ...props
}: FoodItemProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [state, setState] = useState()

    useEffect(() => {
        // stuff here
        setIsLoading(false);
    }, [])
    return (
        <TouchableOpacity 
        className="flex flex-row w-full h-24 justify-between">
            {props.imageSrc ? <Image /> : <View className="bg-black h-full aspect-square"/>}
            { isLoading ??
                <>
                <View className="flex-grow px-3">
                    <Text>{name}</Text>
                    <Text>{description}</Text>
                    <Text>{dateAdded}</Text>
                </View>
                <View className="text-center">
                    <Text>Calories:</Text>
                    <Text>{550}</Text>
                </View>
                </>
            }
        </TouchableOpacity>
    )
}
