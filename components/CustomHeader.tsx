import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface HeaderProps {
    onProfilePress: () => {};
}

export function CustomHeader(props: HeaderProps) {
    return (
        <View className="w-95 px-5 h-14 bg-white shadow-md shadow-gray-200 flex-row justify-between items-center">
            <Text className="font-inter-bold text-2xl">
                PlatePal
            </Text>
            <View className="grid grid-cols-2">
                <View>
                </View>
                <TouchableOpacity onPress={props.onProfilePress}>
                    <Ionicons
                      name="person-circle-outline"
                      size={28}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}
