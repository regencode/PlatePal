import { apiClient } from "./client";


export const HealthAPI = {
    health: () => apiClient.get("/health")
}
