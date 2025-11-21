import { View, Text, Image } from "react-native";
import "../global.css"

export interface WidgetItemProps {
    id: string;
    title: string;
    imageSrc?: string;
}

export default function WidgetItem(props: WidgetItemProps) {
    return (
        <View key={props.id} className="flex flex-col h-fit">
            {props.imageSrc ? <Image /> : <Text>no image</Text>}
            <Text className="text-center">{props.title}</Text>
        </View>
    );
}
