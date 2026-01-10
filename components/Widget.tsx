import { Text, View } from "react-native";
import WidgetItem from "./WidgetItem";
import type { WidgetItemProps } from "./WidgetItem";


interface WidgetProps {
    widgetTitle: string;
    flexDirection: string;
    heightPx?: number;
    children?: React.ReactNode;
    className?: string;
}

export default function Widget({
    heightPx = 200,
    className = "",
    ...props
}: WidgetProps) {
    return (
        <View 
        className={`shadow-lg bg-white rounded-3xl w-full h-fit py-3 overflow-hidden android:elevation-4 ${className}`}>
            <View className="w-full h-fit">
                <Text className="text-black font-semibold w-[90%] mx-auto">{props.widgetTitle}</Text>
            </View>
                <View
                  className={`flex ${
                    props.flexDirection === "row" ? "flex-row grid-cols-3" : "flex-col"
                  } justify-around`}
                >
                    {props.children}
                </View>
        </View>
    );
}
