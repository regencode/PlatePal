import { apiClient } from "./client";


export const LlmAPI = {
    query: (payload: any) => apiClient.post("/llm", payload),
}
