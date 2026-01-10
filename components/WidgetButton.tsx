import { TouchableOpacity, Text, Image } from "react-native";

export interface WidgetButtonProps {
    title: string;
    imageSrc?: string;
    onClick?: () => void;
}

export default function WidgetButton(props: WidgetButtonProps) {
    return (
        <TouchableOpacity className="flex flex-col h-fit">
            {props.imageSrc ? <Image /> : <Text>no image</Text>}
            <Text className="text-center">{props.title}</Text>
        </TouchableOpacity>
    );
}
