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
        console.log("signedUrl:", data.signedUrl);
        console.log("publicUrl:", data.publicUrl);
        const response = await fetch(uri);
        console.log("response:", response);
        const bytes = await response.bytes()
        let formData = new FormData();
        formData.append('file', new File(uri));
        const res = await fetch(
            data.signedUrl,
                {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.EXPO_PUBLIC_CLOUDFLARE_API_KEY}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            },
        )
        if(!res.ok) {
            console.log("Upload error");
            console.log(res);
            return;
        }
        console.log('Upload successful! Public URL:', data.publicUrl);

        return await LlmAPI.query({
            text: "a",
            encodedImage: data.publicUrl
        }) 

    }
}
