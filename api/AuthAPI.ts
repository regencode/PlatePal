import { apiClient, getRefreshToken, storeRefreshToken, setAccessToken, deleteRefreshToken } from "./client";

export const AuthAPI = {
    register: (payload: any) => {
        apiClient.post("/auth/register", payload)
    },
    login: async(payload: any) => {
        const { data } = await apiClient.post("/auth/login", payload)
        setAccessToken(data.accessToken);
        storeRefreshToken(data.refreshToken);
    },
    logout: async() => {
        await apiClient.post("/auth/logout")
        setAccessToken(null);
        deleteRefreshToken();
    },
    refresh: async () => {
        const refreshToken = await getRefreshToken()
        return apiClient.post("/auth/refresh", {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });
    },
}
