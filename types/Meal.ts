import { MealItem } from "./MealItem";

export interface Meal {
    id: number;
    userId: number;
    name: string;
    eatenAt: string;
    createdAt: string;
    mealItems: MealItem[];
}
