import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MealsState {
    allMeals: IFood[];
}

const defaultState: MealsState = {
    allMeals: [],
}

export const mealsReducerSlice = createSlice({
    name: 'mealsData',
    initialState: defaultState,
    reducers: {
        setMeals: (state, action: PayloadAction<IFood[]>) => {
            state.allMeals = action.payload;
        }
    }
});

export const mealsReducer = mealsReducerSlice.reducer;

export const { setMeals } = mealsReducerSlice.actions;
