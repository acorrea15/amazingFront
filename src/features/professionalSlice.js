import { createSlice } from "@reduxjs/toolkit";

// appApi
import appApi from "../services/appApi";

// Estado inicial de los professionales: 
const initialState = [];

// función para cambio de estado de los professionales: 
export const professionalSlice = createSlice({
    name: "professionals",
    initialState,
    reducers: {
        updateProfessionals: (_, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.createProfessional.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.updateProfessional.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.deleteProfessional.matchFulfilled, (_, { payload }) => payload);
    },
});

export const { updateProfessionals } = professionalSlice.actions;
export default professionalSlice.reducer;
