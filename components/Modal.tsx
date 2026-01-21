import { useState } from "react"
import { View } from "react-native"

export interface ModalProps {
    children?: React.ReactNode,
}

export const Modal = (props: ModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    if(!isOpen) {
        return;
    }
    return (
        <View className="bg-black opacity-50 w-full h-full">
            <View className="bg-white bottom-0 w-full h-40">
                {props.children}
            </View>
        </View>
    )
}
