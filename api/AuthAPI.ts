import { apiClient } from "./client";

export const AuthAPI = {
    register: (payload: any) => apiClient.post("/auth/register", payload),
    login: (payload: any) => apiClient.post("/auth/login", payload),
    logout: (payload: any) => apiClient.post("/auth/logout", payload),
}
