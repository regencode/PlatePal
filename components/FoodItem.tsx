import { View, Image, Text } from "react-native"

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
    return (
        <View className="flex flex-row w-full h-24 justify-between">
            {props.imageSrc ? <Image /> : <View className="bg-black h-full aspect-square"/>}
            <View className="flex-grow px-3">
                <Text>{name}</Text>
                <Text>{description}</Text>
                <Text>{dateAdded}</Text>
            </View>
            <View className="text-center">
                <Text>Calories:</Text>
                <Text>{550}</Text>
            </View>
        </View>
    )
}
