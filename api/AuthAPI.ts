import { apiClient, getRefreshToken, storeRefreshToken, setAccessToken, deleteRefreshToken, getAccessToken } from "./client";

export const AuthAPI = {
    register: (payload: any) => {
        return apiClient.post("/auth/register", payload)
    },
    login: async(payload: any) => {
        const { data } = await apiClient.post("/auth/login", payload)
        console.log(data);
        setAccessToken(data.accessToken);
        storeRefreshToken(data.refreshToken);
    },
    logout: async() => {
        const refreshToken = await getRefreshToken();
        console.log("refresh", refreshToken);
        await apiClient.post("/auth/logout", {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });
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
