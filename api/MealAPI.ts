import { apiClient } from "./client";


export const MealAPI = {
    createMeal: (payload: any) => {
        return apiClient.post("/me/meals", {
            ...payload,
        });
    },
    getTodayMeals: () => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const now = new Date()
        console.log(now, timezone);
        return apiClient.get("/me/meals", {
            params: { date: now, timezone }
        });
    },

    getAllMeals: () => apiClient.get("/me/meals"),

    createMealItem: (mealId: number, payload: any) => {
        return apiClient.post(`/me/meals/${mealId}`, {
            ...payload,
        });
    },

    getMealItemsFromMeal: (mealId: number) => {
        return apiClient.get(`/me/meals/${mealId}`);
    },
    
    updateMeal: (mealId: number, payload: any) => {
        return apiClient.patch(`/me/meals/${mealId}`, {
            ...payload,
        });
    },
    updateMealItem: (mealItemId: number, payload: any) => {
        return apiClient.patch(`/mealItem/${mealItemId}`, {
            ...payload,
        });
    },
    deleteMeal: (mealId: number) => {
        return apiClient.delete(`/me/meals/${mealId}`);
    },
    deleteMealItem: (mealItemId: number) => {
        return apiClient.delete(`/mealIte/${mealItemId}`);
    },
}
