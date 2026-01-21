import { Ionicons } from "@expo/vector-icons";
import { createContext, useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export enum ModalType {
    MEAL,
    MEALITEM,
}

export type ModalPayload = 
    | {
          type: ModalType.MEAL;
          mealId: number;
      }
    | {
          type: ModalType.MEALITEM;
          mealItemId: number;
          onEdit: () => any;
          onDelete: () => any;
      }

export interface ModalContextValue {
    showModal: (payload: ModalPayload) => void;
    hideModal: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const MealModal = ({ payload }: { payload: Extract<ModalPayload, { type: ModalType.MEAL}>}) => {
    return (
        <View>
            <Text>
                MealModal
            </Text>
        </View>
    );
}

interface MealItemModalProps {
    payload: Extract<ModalPayload, { type: ModalType.MEALITEM }>,
    onClose: () => void,
}


const MealItemModal = ({ payload, onClose }: MealItemModalProps) => {
    return (
        <View className="absolute w-full h-full"
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        >
            <View className="absolute w-full bg-white bottom-0">
                <TouchableOpacity 
                onPress={onClose}
                className="h-16 w-full flex flex-row justify-center">
                    <Ionicons 
                    name="chevron-down"
                    size={36}
                    />
                </TouchableOpacity>
                <View className="flex flex-col w-[80%] mx-auto gap-5 my-10">
                    <TouchableOpacity className="flex flex-row gap-2"
                    onPress={payload.onEdit}
                    >
                        <Ionicons 
                        name="pencil"
                        size={28}
                        />
                        <Text className= "text-3xl">
                            Edit...
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex flex-row gap-2"
                    onPress={payload.onDelete}
                    >
                        <Ionicons 
                        name="trash"
                        size={28}
                        />
                        <Text className= "text-3xl">
                            Delete...
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="h-36" />
            </View>
        </View>
    );
}


export function ModalProvider({ children }: { children: React.ReactNode }) {

    const [modalPayload, setModalPayload] = useState<ModalPayload | null>(null)
    const showModal = (payload: ModalPayload) => setModalPayload(payload);
    const hideModal = () => setModalPayload(null);

    const renderModal = () => {
        if(!modalPayload) {
            return null;
        }
        else if(modalPayload.type == ModalType.MEAL) {
            return <MealModal 
            payload={modalPayload}/>;
        }
        else if(modalPayload.type == ModalType.MEALITEM) {
            return <MealItemModal 
            onClose={() => hideModal()}
            payload={modalPayload} />;
        }
        else throw new Error("show(payload.type) : type must be in ModalType or ModalPayload must be null")
    }
    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            { children }
            { renderModal() }
        </ModalContext.Provider>
    )
}

export function useModal() {
    const ctx = useContext(ModalContext);
    if(!ctx) {
        throw new Error("useModal must be used within ModalProvider");
    }
    return ctx;
}
