import { View, Text, TouchableOpacity } from "react-native"
import { useState } from "react";

interface DropdownProps {
    defaultOpenState: boolean;
    title: string;
    children: React.ReactNode[];
    onPress?: () => void;
}

function Dropdown(props : DropdownProps) {
    const [isOpen, setIsOpen] = useState(props.defaultOpenState);
    return (
        <View className="w-full shadow-md shadow-gray-500 bg-white rounded-3xl">
            <View className="flex flex-col gap-2 w-[85%] justify-center mx-auto my-3">
                <TouchableOpacity 
                onPress={() => setIsOpen(!isOpen)}
                className="flex flex-row w-full text-left justify-between">
                    <View className="flex flex-row gap-4">
                        <Text className="text-2xl font-condensed-inconsolata-bold">{props.title}</Text>
                    </View>
                    <TouchableOpacity 
                    className="w-9 bg-green-600 aspect-square rounded-full"
                    onPress={props.onPress}
                    >
                        <Text className="text-3xl text-center text-white">
                            +
                        </Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                {isOpen && props.children}
                {isOpen && (props.children.length === 0) && 
                    <View className="w-full h-10">
                        <Text className="text-sm opacity-50 text-center">
                            Add meal items by clicking the "+" button
                        </Text>
                    </View>
                }
            </View>
        </View>
    )
}

export default Dropdown;
