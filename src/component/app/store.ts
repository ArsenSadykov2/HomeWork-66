import {configureStore} from "@reduxjs/toolkit";
import {mealsReducer} from "../../containers/slices/mealSlices.ts";


export const store = configureStore({
    reducer: {
        meals: mealsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;