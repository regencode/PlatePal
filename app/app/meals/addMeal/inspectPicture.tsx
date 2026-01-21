import { View, TouchableOpacity, Image, Text } from "react-native"
import { StatusBar } from "expo-status-bar"
import { CustomHeader } from "@/components/CustomHeader"
import { useRouter, useLocalSearchParams } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { ImageManipulatorContext, SaveFormat, useImageManipulator  } from "expo-image-manipulator"
import { useEffect, useState } from "react"


export default function inspectPicture() {
    const router = useRouter()
    const { mealId, uri: originalUri } = useLocalSearchParams<{mealId: string, uri: string}>();
    const [imageUri, setImageUri] = useState(originalUri);
    const [isReady, setIsReady] = useState(false);
    const context = useImageManipulator(imageUri);

    const processImage = async () => {
        context.resize({
            width: 384,
            height: 512,
        })
        const renderedImage = await context.renderAsync();
        const result = await renderedImage.saveAsync({
            format: SaveFormat.JPEG,
            compress: 0.6,
        });
        setImageUri(result.uri);
    }
    useEffect(() => {
        processImage();
        setIsReady(true);
        console.log(imageUri);
    }, [])
    
    if(!isReady) {
        return (
            <View>
                <Text>Loading image...</Text>
            </View>
        );
    }
    return (
        <View>
            <StatusBar style="light" />
            <View className="pt-safe bg-black">
                <Image
                source={{ uri: originalUri }}
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
                            params: { mealId, uri: imageUri, originalUri }
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
