// src/features/appointments/appointmentsAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APIDomain";
import type { RootState } from "../../app/store";


export type TAppointment = {
  appointment_id: number;
  user_id: number;
  doctor_id: number;
  appointment_date: string;
  time_slot: string;
  total_amount: string | null;
  appointment_status: "Pending" | "Completed" | "Cancelled";
  created_at?: string;
  updated_at?: string;
};


export type TAppointmentFull = {
  appointment_id: number;
  appointment_date: string;
  time_slot: string;
  total_amount: string | null;
  appointment_status: "Pending" | "Completed" | "Cancelled";
  created_at?: string;
  updated_at?: string;

  
  user?: {
    user_id: number;
    firstname: string;
    lastname: string;
    email?: string;
  } | null;

 
  doctor?: {
    doctor_id: number;
    first_name: string;
    last_name: string;
    specialization?: string;
  } | null;

  prescriptions?: {
    prescription_id: number;
    notes?: string;
  }[];

  payments?: {
    payment_id: number;
    amount: string;
    payment_status: string;
  }[];
};

export const appointmentsAPI = createApi({
  reducerPath: "appointmentsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Appointments"],
  endpoints: (builder) => ({
    
    getAppointments: builder.query<TAppointmentFull[], void>({
      query: () => "/appointment",
      transformResponse: (res: { data: TAppointmentFull[] }) => res.data,
      providesTags: ["Appointments"],
    }),

    
    getAppointmentById: builder.query<TAppointmentFull, number>({
      query: (id) => `/appointment/${id}`,
      transformResponse: (res: { data: TAppointmentFull }) => res.data,
      providesTags: ["Appointments"],
    }),

    
    getAppointmentsByDoctor: builder.query<TAppointmentFull[], number>({
      query: (doctor_id) => `/appointment/doctor/${doctor_id}`,
      transformResponse: (res: { data: TAppointmentFull[] }) => res.data,
      providesTags: ["Appointments"],
    }),

    
    getAppointmentsByUser: builder.query<TAppointmentFull[], number>({
      query: (user_id) => `/appointment/user/${user_id}`,
      transformResponse: (res: { data: TAppointmentFull[] }) => res.data,
      providesTags: ["Appointments"],
    }),

    //  Create
    createAppointment: builder.mutation<TAppointment, Partial<TAppointment>>({
      query: (newAppointment) => ({
        url: "/appointment",
        method: "POST",
        body: newAppointment,
      }),
      invalidatesTags: ["Appointments"],
    }),

    //  Update
    updateAppointment: builder.mutation<
      TAppointment,
      Partial<TAppointment> & { appointment_id: number }
    >({
      query: ({ appointment_id, ...updates }) => ({
        url: `/appointment/${appointment_id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Appointments"],
    }),

    // Delete
    deleteAppointment: builder.mutation<{ success: boolean; id: number }, number>({
      query: (appointment_id) => ({
        url: `/appointment/${appointment_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appointments"],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useGetAppointmentsByDoctorQuery,
  useGetAppointmentsByUserQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentsAPI;
