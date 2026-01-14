import { Text, TouchableOpacity} from "react-native";

interface ButtonProps {
    text: string;
    onPress: () => void;
    className?: string;
}

export default function CustomButton({
    className = "",
    ...props
}: ButtonProps) {
    return (
        <TouchableOpacity
        onPress={props.onPress}
        className={`bg-green-600 rounded-full justify-center items-center ${className}`}
        activeOpacity={0.8}
        >
            <Text className="text-white text-sm font-inter-semibold">
            {props.text}
            </Text>
        </TouchableOpacity>
    );
}
