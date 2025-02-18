interface IFoodForm {
    type: string;
    meal_date: string;
    description: string;
    calories: number;
}


interface IFood {
    id: string;
    type: string;
    meal_date: string;
    description: string;
    calories: number;
}

interface IFoodApi {
    [id: string] : IMeal;
}