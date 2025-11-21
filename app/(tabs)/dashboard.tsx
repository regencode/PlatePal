import { View, ScrollView, Text } from "react-native";
import Widget from "@/components/Widget";
import "@/global.css";
import Dropdown from "@/components/Dropdown";


export default function Dashboard() {
    return (
        <View className="flex flex-col gap-5 items-center h-[100%] w-[90%] pt-5 mx-auto">
            <Text>Welcome, user</Text>
            <Widget widgetTitle="Summary"
            itemProps={[
                {id: "1", title: "A"},
                {id: "2", title: "B"},
                {id: "3", title: "C"},
                {id: "4", title: "D"},
            ]}/>
            <Widget widgetTitle="Summary"
            itemProps={[
                {id: "1", title: "A"},
                {id: "2", title: "B"},
                {id: "3", title: "C"},
            ]}/>
            <Dropdown defaultOpenState={false} title="Today" >
                <Text> Hello </Text>
            </Dropdown>
            <Dropdown defaultOpenState={false} title="Yesterday" >
                <Text> Hello </Text>
            </Dropdown>
        </View>
    );
}

