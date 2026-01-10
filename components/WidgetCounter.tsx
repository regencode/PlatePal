import { View, Text } from "react-native";

export interface WidgetCounterProps {
    title: string;
    curAmount: number;
    limitAmount: number;
}

export default function WidgetCounter({
    curAmount = 0,
    limitAmount =  1,
    ...props
}: WidgetCounterProps) {
    return (
        <View className="flex flex-col h-fit">
            <Text className="text-center">{props.title}</Text>
            <Text className="text-center">{curAmount}/{limitAmount}</Text>
        </View>
    );
}
