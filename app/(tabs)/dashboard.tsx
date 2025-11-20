import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Widget from "@/components/Widget";
import "@/global.css";


export default function Dashboard() {
    return (
        <View className="flex flex-col gap-5 items-center h-[100%] w-[90%] pt-5 mx-auto ">
            <Text>Welcome, user</Text>
            <Widget widgetTitle="Summary"
            itemProps={[
                {title: "A"},
                {title: "B"},
                {title: "C"},
                {title: "C"},
            ]}/>

            <Widget widgetTitle="Summary"
            itemProps={[
                {title: "A"},
                {title: "B"},
                {title: "C"},
                {title: "C"},
            ]}/>
        </View>
    );
}

