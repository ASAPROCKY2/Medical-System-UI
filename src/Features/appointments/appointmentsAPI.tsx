
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
  

  
  doctor_id: number;
  
  doctor_name: string;
  user_id: number;
  patient_name: string;

  prescriptions?: {

    prescription_id: number;
    appointment_id: number;
    doctor_id: number;
    patient_id: number;

    notes: string;
    created_at?: string;
    updated_at?: string;
  }[];

  payments?: {
    payment_id: number;
    
    appointment_id: number;

    amount: string;
    payment_status: string;
    transaction_id?: string;
    payment_date?: string;
    created_at?: string;
    updated_at?: string;
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
    // Get all
    getAppointments: builder.query<TAppointmentFull[], void>({
      query: () => "/appointment",
      transformResponse: (res: { data: TAppointmentFull[] }) => res.data,
      providesTags: ["Appointments"],
    }),

    // Get by id
    getAppointmentById: builder.query<TAppointmentFull, number>({

      query: (id) => `/appointment/${id}`,
      transformResponse: (res: { data: TAppointmentFull }) => res.data,
      providesTags: ["Appointments"],
    }),

    // Get by doctor
    getAppointmentsByDoctor: builder.query<TAppointmentFull[], number>({
      query: (doctor_id) => `/appointment/doctor/${doctor_id}`,

      transformResponse: (res: { data: TAppointmentFull[] }) => res.data,

      providesTags: ["Appointments"],

    }),

    // Get by user
    getAppointmentsByUser: builder.query<TAppointmentFull[], number>({
      query: (user_id) => `/appointment/user/${user_id}`,

      transformResponse: (res: { data: TAppointmentFull[] }) => res.data,
      providesTags: ["Appointments"],
    }),

    // Create
    createAppointment: builder.mutation<TAppointment, Partial<TAppointment>>({
      query: (newAppointment) => ({
        url: "/appointment",

        method: "POST",

        body: newAppointment,
      }),
      invalidatesTags: ["Appointments"],
    }),

    // Update
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
