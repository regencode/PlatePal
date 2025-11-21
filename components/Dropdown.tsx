import { View, Text, TouchableOpacity } from "react-native"
import { useState } from "react";

interface DropdownProps {
    defaultOpenState: boolean;
    title: string;
    children: React.ReactNode;
}

function Dropdown( props : DropdownProps) {
    const [isOpen, setIsOpen] = useState(props.defaultOpenState);
    return (
        <View className="w-full">
            <TouchableOpacity 
            onPress={() => setIsOpen(!isOpen)}
            className="flex flex-row gap-4">
                <Text className="text-3xl">+</Text>
                <Text className="text-2xl">{props.title}</Text>
            </TouchableOpacity>
            {isOpen ? props.children : false}
            <View className="w-full h-[3px] bg-gray-300" />
        </View>
    )
}

export default Dropdown;
