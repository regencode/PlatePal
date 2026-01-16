import { apiClient } from "./client";
import { LlmAPI } from "./LlmAPI";
import { fetch } from "expo/fetch";
import { File, Paths } from "expo-file-system";

export const ImageUploadAPI = {
    getSignedAndPublicUrl: async (fileName: string) => {
        return await apiClient.get("/s3/upload-url", {
            params: {
                fileName: fileName,
            }
        })
    },
    uploadImageGivenUrl: async (uri: string, signedUrl: string) => {
        const fileData = await fetch(uri);
        const blob = await fileData.blob();
        const uploadRes = await fetch(signedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'image/jpg', // must match ContentType used in signed URL
            },
            body: blob,
        });
        if (!uploadRes.ok) {
            console.error('Upload failed', await uploadRes.text());
            return;
        }
    },
    uploadAndQueryLLM: async (uri: string) => {
        const fileName = uri.split('/').pop();
        const { data } = await apiClient.get("/s3/upload-url", {
            params: {
                fileName: fileName,
            }
        })
        console.log("uri:", uri);
        const file = new File(uri);
        console.log("signedUrl:", data.signedUrl);
        console.log("publicUrl:", data.publicUrl);
        const response = await fetch(data.signedUrl, {
            method: 'PUT',
            body: file,
        });
        console.log('Upload successful! Public URL:', data.publicUrl);

        return await LlmAPI.query({
            text: "a",
            encodedImage: data.publicUrl
        }) 

    }
}
