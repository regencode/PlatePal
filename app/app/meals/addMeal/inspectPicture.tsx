import { View, TouchableOpacity, Image, Text } from "react-native"
import { StatusBar } from "expo-status-bar"
import { CustomHeader } from "@/components/CustomHeader"
import { useRouter, useLocalSearchParams } from "expo-router"
import { Ionicons } from "@expo/vector-icons"


export default function inspectPicture() {
    const router = useRouter()
    const { uri } = useLocalSearchParams<{uri: string}>();
    return (
        <View>
            <StatusBar style="light" />
            <View className="pt-safe bg-black">
                <Image
                source={{ uri }}
                style={{ width: "100%", height: "77%", position: "absolute"}}
                />
                <View className="h-full w-full">
                    <View className="relative z-10 android:elevation-10">
                        <CustomHeader 
                        theme="dark"
                        className="bg-transparent"
                        headerText="Add meal" onBackPress={() => router.back()} />
                    </View>
                    <View className="absolute flex flex-row gap-5 w-full bottom-24 items-center justify-around h-18"> 
                        <TouchableOpacity 
                        onPress={() => router.back()}
                        className="flex-1 h-full aspect-[2/1] bg-white align-middle items-center justify-center rounded-xl">
                            <Ionicons
                            name="refresh-circle"
                            size={32}
                            className="justify-center"
                            />
                            <Text>Retake picture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => router.push({
                            pathname: "/app/meals/addMeal/process",
                            params: { uri }
                        })}
                        className="flex-1 h-full aspect-[2/1] bg-white align-middle items-center justify-center rounded-xl">
                            <Ionicons
                            name="arrow-redo"
                            size={32}
                            className="justify-center"
                            />
                            <Text>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
