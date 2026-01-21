export interface MealItem {
    id: number;
    food_name: string
    estimated_portion_g: number;
    calories_kcal: number;
    protein_g: number;
    fat_g: number;
    carbohydrates_g: number;
    fiber_g?: number;
    sugar_g?: number;
    sodium_mg?: number;
    imageSrc?: string;
    imageUri?: string;
}

