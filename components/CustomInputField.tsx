import { View, TextInput } from "react-native";

interface InputFieldProps {
    text: string;
    className?: string;
    onChange?: () => void;
    placeholder?: string;
    textInputClassName?: string;
    keyboardType?: string;
    autoCapitalize?: string;
}

export default function CustomInputField({
    className = "",
    placeholder = "your@email.com",
    textInputClassName="text-base text-black",
    keyboardType="email-address",
    autoCapitalize="none",
    ...props
}: InputFieldProps) {
    return (
        <View className={"w-full h-[40px] bg-gray-200 rounded-xl px-4 justify-center border border-gray-300" + className}>
            <TextInput
            placeholder={placeholder}
            placeholderTextColor="#9fA6B4" // gray-400
            className={textInputClassName}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            onChange={props.onChange}
            />
        </View>
    );
}
