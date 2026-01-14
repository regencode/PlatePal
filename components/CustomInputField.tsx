import { View, TextInput, KeyboardType } from "react-native";

interface InputFieldProps {
    value?: string;
    className?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    textInputClassName?: string;
    keyboardType?: KeyboardType;
    autoCapitalize?: any;
    secureTextEntry?: boolean;
}

export default function CustomInputField({
    className = "",
    placeholder = "",
    textInputClassName="text-base text-black",
    keyboardType="default",
    autoCapitalize="none",
    secureTextEntry=false,
    ...props
}: InputFieldProps) {
    return (
        <View className={`w-full h-[40px] bg-gray-200 px-4 justify-center border border-gray-300 ${className}`}>
            <TextInput
            value={props.value}
            placeholder={placeholder}
            placeholderTextColor="#9fA6B4" // gray-400
            className={textInputClassName}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            onChangeText={props.onChangeText}
            secureTextEntry={secureTextEntry}
            />
        </View>
    );
}
