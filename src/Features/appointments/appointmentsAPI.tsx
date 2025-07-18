// src/features/appointments/appointmentsAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APIDomain";
import type { RootState } from "../../app/store";

// ✅ Flat appointment type for create/update
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

// ✅ Extended appointment type with full details (matches backend join)
export type TAppointmentFull = {
  appointment_id: number;
  appointment_date: string;
  time_slot: string;
  total_amount: string | null;
  appointment_status: "Pending" | "Completed" | "Cancelled";
  created_at?: string;
  updated_at?: string;

  // Patient info
  user?: {
    user_id: number;
    firstname: string;
    lastname: string;
    email?: string;
  } | null;

  // Doctor info
  doctor?: {
    doctor_id: number;
    first_name: string;
    last_name: string;
    specialization?: string;
  } | null;

  // Optional joined data
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
    //  Get all appointments with joined doctor/user
    getAppointments: builder.query<TAppointmentFull[], void>({
      query: () => "/appointment",
      transformResponse: (response: { data: TAppointmentFull[] }) => response.data,
      providesTags: ["Appointments"],
    }),

    //  Get appointment by ID
    getAppointmentById: builder.query<TAppointmentFull, number>({
      query: (id) => `/appointment/${id}`,
      transformResponse: (response: { data: TAppointmentFull }) => response.data,
      providesTags: ["Appointments"],
    }),

    //  Get by doctor
    getAppointmentsByDoctor: builder.query<TAppointmentFull[], number>({
      query: (doctor_id) => `/appointment/doctor/${doctor_id}`,
      transformResponse: (response: { data: TAppointmentFull[] }) => response.data,
      providesTags: ["Appointments"],
    }),

    //  Get by user
    getAppointmentsByUser: builder.query<TAppointmentFull[], number>({
      query: (user_id) => `/appointment/user/${user_id}`,
      transformResponse: (response: { data: TAppointmentFull[] }) => response.data,
      providesTags: ["Appointments"],
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

    //  Delete
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
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentsAPI;
