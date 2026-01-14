import { apiClient } from "./client";
import * as RNLocalize from "react-native-localize";


export const MealAPI = {
    createMeal: (payload: any) => {
        apiClient.post("/me/meals", {
            ...payload,
        });
    },
    getTodayMeals: () => {
        const timezone = RNLocalize.getTimeZone();
        apiClient.get("/me/meals", {
            params: { timezone }
        });
    },

    createMealItem: (mealId: number, payload: any) => {
        apiClient.post(`/me/meals/${mealId}`, {
            ...payload,
        });
    },

    getMealItems: (mealId: number) => {
        apiClient.get(`/me/meals/${mealId}`);
    },
}
