import { View, Text, Image } from "react-native";
import "../global.css"

export interface WidgetItemProps {
    title: string;
    imageSrc?: string;
}

export default function WidgetItem(props: WidgetItemProps) {
    return (
        <View className="flex flex-col h-fit">
            {props.imageSrc ? <Image /> : "no image"}
            <Text className="text-center">{props.title}</Text>
        </View>
    );
}
