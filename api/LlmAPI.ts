import { apiClient } from "./client";
import { Directory, File } from "expo-file-system";


export const LlmAPI = {
    query: (payload: any) => apiClient.post("/llm", payload),

    queryFromImageUri: async (imageUri: string) => {
        const directory = new Directory(imageUri);
        const file = new File(directory);
        const b64 = `data:image/jpeg;base64,${await file.base64()}`        
        console.log("after");
        return await apiClient.post("/llm", {
            text: "",
            encodedImage: b64,
        });
    },
}
