import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface HeaderProps {
    headerText?: string;
    onProfilePress?: () => any;
    onBackPress?: () => any;
    className?: string;
    theme?: string;
    displayMembership?: boolean;
    membershipText?: string;
}

export function CustomHeader({
    headerText = "PlatePal",
    displayMembership = false,
    membershipText = "FREE",
    className= "",
    theme="light",
    ...props
}: HeaderProps) {
    return (
        <View className={
            `w-95 px-5 h-14 flex-row justify-between items-center 
            ${
                theme === "light" ?
                "bg-white shadow-lg shadow-gray-500"
                :
                "bg-black"
            } 
            ${className}`
        }>
            {props.onBackPress && 
            <TouchableOpacity>
                <Ionicons 
                name="arrow-back"
                size={28}
                onPress={props.onBackPress}
                color={
                    theme === "light" ?
                    "black"
                    :
                    "white"
                }
                />
            </TouchableOpacity>
            }
            <Text className={`font-inter-bold text-2xl self-center
            ${
                theme === "light" ?
                "text-black"
                :
                "text-white"
            }
            `}>
                {headerText} 
            </Text>
            <View className="flex flex-row justify-between w-32 items-center">
                <View className="h-fit w-fit">
                    {displayMembership &&
                        <TouchableOpacity className="border border-black rounded-3xl px-5">
                            <Text className="font-condensed-inconsolata-bold text-xl">
                                FREE
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
                <View className="h-fit w-fit">
                    {props.onProfilePress &&
                        <TouchableOpacity onPress={props.onProfilePress}>
                            <Ionicons
                              name="person-circle-outline"
                              size={28}
                              color={
                                theme === "light" ?
                                "black"
                                :
                                "white"
                              }
                              />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}
