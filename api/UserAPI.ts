import { apiClient } from "./client";


export const UserAPI = {
    getProfile: () => {
        return apiClient.get("/users/me");
    },
}
