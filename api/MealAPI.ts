import { apiClient } from "./client";


export const MealAPI = {
    createMeal: (payload: any) => {
        apiClient.post("/me/meals", {
            ...payload,
        });
    },
    getTodayMeals: () => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const now = new Date()
        console.log(now, timezone);
        apiClient.get("/me/meals", {
            params: { date: now, timezone }
        });
    },

    createMealItem: (mealId: number, payload: any) => {
        apiClient.post(`/me/meals/${mealId}`, {
            ...payload,
        });
    },

    getMealItemsFromMeal: (mealId: number) => {
        apiClient.get(`/me/meals/${mealId}`);
    },
    
    updateMeal: (mealId: number, payload: any) => {
        apiClient.patch(`/me/meals/${mealId}`, {
            ...payload,
        });
    },
    updateMealItem: (mealItemId: number, payload: any) => {
        apiClient.patch(`/mealItem/${mealItemId}`, {
            ...payload,
        });
    },
    deleteMeal: (mealId: number) => {
        apiClient.delete(`/me/meals/${mealId}`);
    },
    deleteMealItem: (mealItemId: number) => {
        apiClient.delete(`/mealIte/${mealItemId}`);
    },
}
