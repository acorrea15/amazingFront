import { createSlice } from "@reduxjs/toolkit";

// appApi
import appApi from "../services/appApi";

// Estado inicial de los turnos: 
const initialState = [];

// función para cambio de estado de los turnos: 
export const appointmentScheduleSlice = createSlice({
    name: "appointmentsSchedule",
    initialState,
    reducers: {
        updateAppointmentsSchedule: (_, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.createAppointmentSchedule.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.updateAppointmentSchedule.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.deleteAppointmentSchedule.matchFulfilled, (_, { payload }) => payload);
    },
});

export const { updateAppointmentsSchedule } = appointmentScheduleSlice.actions;
export default appointmentScheduleSlice.reducer;
