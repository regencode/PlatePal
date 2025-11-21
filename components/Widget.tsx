import { Text, View } from "react-native";
import WidgetItem from "./WidgetItem";
import type { WidgetItemProps } from "./WidgetItem";


interface WidgetProps {
    widgetTitle: string;
    itemProps: WidgetItemProps[];
}

export default function Widget(props: WidgetProps) {
    return (
        <View className="shadow-lg rounded-3xl w-full h-[150px] overflow-hidden android:elevation-4">
            <View className="bg-black w-full h-fit">
                <Text className="text-white w-[90%] mx-auto">{props.widgetTitle}</Text>
            </View>
            <View className="flex flex-row grid-cols-3 justify-around">
                {props.itemProps.map((props) => {
                    return <WidgetItem key={props.id} title={props.title} imageSrc={props.imageSrc} />
                })}
            </View>
        </View>
    );
}
