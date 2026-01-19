import { Text, View, TouchableOpacity } from "react-native";
import { CustomHeader } from "@/components/CustomHeader";
import { useRouter, useLocalSearchParams } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/theme";
import CustomButton from "@/components/CustomButton";
import { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ImageManipulatorContext, SaveFormat, useImageManipulator } from "expo-image-manipulator"

export default function addMealItem() {
    const router = useRouter()
    const [permission, requestPermission] = useCameraPermissions();
    const {mode, theme, setTheme} = useTheme();
    const cameraRef = useRef<CameraView>(null);
    const { mealId } = useLocalSearchParams<{mealId: string}>();


    const takePhoto = async () => {
        if (!cameraRef.current) return;

        const photo = await cameraRef.current.takePictureAsync({
            quality: 0.6,
            skipProcessing: true,
        });

        console.log(photo.uri);
        console.log(photo.height, photo.width);
        router.push({
            pathname: "/app/meals/addMeal/inspectPicture",
            params: {
                mealId: mealId,
                uri: photo.uri,
            }
        });
    };

    useEffect(() => {
        setTheme("dark");
    }, [])

    if (!permission?.granted) {
        return (
            <View className="flex flex-col justify-center h-full">
            <CustomButton text="Get camera permissions" onPress={() => requestPermission()}/>
            </View>
        )
    }
    return (
        <View>
        <StatusBar style="light" />
        <View className="pt-safe bg-black">
        <CameraView 
        ref={cameraRef}
        style={{ width: "100%", height: "75%", position: "absolute"}}
        facing="back" 
        animateShutter={false}
        />
        <View className="h-full w-full">
        <View className="relative z-10 android:elevation-10">
        <CustomHeader 
        theme={mode}
        className="bg-transparent"
        headerText="Add meal" onBackPress={() => router.back()} />
        </View>
        <View className="absolute flex flex-row w-full bottom-24 items-center justify-around"> 
        <TouchableOpacity className="flex w-14 aspect-square bg-white align-middle items-center justify-center rounded-xl">
        <Ionicons
        name="images"
        size={32}
        className="justify-center"
        />
        </TouchableOpacity>
        <View className="w-28 aspect-square rounded-full bg-black border-4 border-white align-middle justify-center items-center">
        <TouchableOpacity 
        onPress={() => takePhoto()}
        className="w-24 aspect-square rounded-full bg-white" />
        </View>
        <TouchableOpacity className="flex w-14 aspect-square bg-white align-middle items-center justify-center rounded-xl">
        <Ionicons
        name="reorder-three"
        size={32}
        className="justify-center"
        />
        </TouchableOpacity>
        </View>
        </View>
        </View>
        </View>
    )
}

