import { createSlice } from "@reduxjs/toolkit";

// appApi
import appApi from "../services/appApi";

// Estado inicial de los turnos: 
const initialState = [];

// función para cambio de estado de los turnos: 
export const appointmentSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        updateAppointments: (_, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.createAppointment.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.updateAppointment.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.deleteAppointment.matchFulfilled, (_, { payload }) => payload);
    },
});

export const { updateAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;
