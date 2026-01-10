import { View, Text } from "react-native";

export interface WidgetBarProps{
    title?: string;
    curAmount?: number;
    limitAmount?: number;
    textEnabled?: boolean;
    className?: string;
    barClassName?: string;
    barColor?: string;
}

export default function WidgetBar({
    curAmount = 0,
    limitAmount =  1,
    textEnabled = false,
    className = "",
    barClassName = "",
    barColor = "bg-black",
    ...props
}: WidgetBarProps) {
    return (
        <View className={`flex flex-col w-[85%] mx-auto ${className}` }>
            {textEnabled ? <View className="flex flex-row justify-between">
                <Text className="text-center text-md">{props.title}</Text>
                <Text className="text-center text-md">{curAmount}/{limitAmount}</Text>
            </View> : false}
            <View className={`w-full h-3 bg-gray-200 rounded-full overflow-hidden ${barClassName}`}>
              <View
                className={`h-full ${barColor}`}
                style={{ width: `${(curAmount!/limitAmount!)* 100}%` }}
              />
            </View>
        </View>
    );
}
