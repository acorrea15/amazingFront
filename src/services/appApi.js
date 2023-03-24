import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Creación de la API

export const appApi = createApi({
    reducerPath: "appApi",
    /* baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }), */
    baseQuery: fetchBaseQuery({ baseUrl: "https://amazingback-production.up.railway.app/" }),

    endpoints: (builder) => ({
        
       /*  signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,
            }),
        }), */

        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),
       
         
        // creación del nuevo profesional
        createProfessional: builder.mutation({
            query: (professional) => ({
                url: "/professionals",
                body: professional,
                method: "POST",
            }),
        }),

        
        deleteProfessional: builder.mutation({
            query: ({ professional_id, user_id }) => ({
                url: `/professionals/${professional_id}`,
                body: {
                    user_id,
                },
                method: "DELETE",
            }),
        }),
        
        updateProfessional: builder.mutation({
            query: (professional) => ({
                url: `/professionals/${professional.id}`,
                body: professional,
                method: "PATCH",
            }),
        }),  


       // creación del nuevo turno
        createAppointment: builder.mutation({
            query: (appointment) => ({
                url: "/appointments",
                body: appointment,
                method: "POST",
            }),
        }),      
    
    
        deleteAppointment: builder.mutation({
            query: ({ appointment_id, user_id }) => ({
                url: `/appointments/${appointment_id}`,
                body: {
                    user_id,
                },
                method: "DELETE",
            }),
        }), 
        
        updateAppointment: builder.mutation({
            query: (appointment) => ({
                url: `/appointments/${appointment.id}`,
                body: appointment,
                method: "PATCH",
            }),
        }),     



        // creación del nuevo esquema para los turno
        createAppointmentSchedule: builder.mutation({
             query: (appointmentSchedule) => ({
                 url: "/appointmentsschedule",
                 body: appointmentSchedule,
                 method: "POST",
             }),
         }),      
    
    
         deleteAppointmentSchedule: builder.mutation({
             query: ({ appointmentSchedule_id, user_id }) => ({
                 url: `/appointmentsschedule/${appointmentSchedule_id}`,
                 body: {
                     user_id,
                 },
                 method: "DELETE",
             }),
         }), 
         
         updateAppointmentSchedule: builder.mutation({
             query: (appointmentSchedule) => ({
                 url: `/appointmentsschedule/${appointmentSchedule.id}`,
                 body: appointmentSchedule,
                 method: "PATCH",
             }),
         }),     
            


    }),
});

export const {
   /*  useSignupMutation, */
    useLoginMutation,
    useCreateProfessionalMutation,
    useDeleteProfessionalMutation,
    useUpdateProfessionalMutation,
    useCreateAppointmentMutation,
    useDeleteAppointmentMutation,
    useUpdateAppointmentMutation,
    useCreateAppointmentScheduleMutation,
    useDeleteAppointmentScheduleMutation,
    useUpdateAppointmentScheduleMutation,
    /* useCreateProductMutation,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useIncreaseCartProductMutation,
    useDecreaseCartProductMutation,
    useCreateOrderMutation,
    useDeleteProductMutation,
    useUpdateProductMutation, */
} = appApi;

export default appApi;
