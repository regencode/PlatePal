import axios from "axios";

export const apiClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
    headers: { "Content-Type": "application/json" },
});
