import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface MealsState {
    meals: IFood[];
}


const initialState: MealsState = {
    meals: [],
}

export const mealsSlice = createSlice({
    name: 'Meals',
    initialState,
    reducers: {
        addMeals: (state, action: PayloadAction<IFood[]>) => {
            state.meals = action.payload;
        }
    }
});


export const mealsReducer = mealsSlice.reducer;

export const {addMeals} = mealsSlice.actions

