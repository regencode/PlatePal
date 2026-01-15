import { apiClient } from "./client";


export const UserAPI = {
    getProfile: (payload: any) => {
        apiClient.post("/me/meals", {
            ...payload,
        });
    },
}
