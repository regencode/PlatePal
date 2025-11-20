import { Text, TouchableOpacity} from "react-native";

interface ButtonProps {
    text: string;
    onPress: () => {}
}

export default function CustomButton(props : ButtonProps) {
    return (
        <TouchableOpacity 
        onPress={props.onPress}
        className="border border-black rounded-3xl w-[70%] h-[50px] overflow-hidden">
            <Text className="text-2xl text-center justify-center">{props.text}</Text>
        </TouchableOpacity>
    );
}
