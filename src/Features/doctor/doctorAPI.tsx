// src/features/doctors/doctorAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APIDomain";
import type { RootState } from "../../app/store";

export type TDoctor = {
  doctor_id: number;
  first_name: string;
  last_name: string;
  specialization?: string | null;
  contact_phone?: string | null;
  available_days?: string | null; 
  created_at?: string;
  updated_at?: string;
  user_id: number; 
};

export const doctorsAPI = createApi({
  reducerPath: "doctorsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain, // for example: "http://localhost:8081"
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Doctors"],
  endpoints: (builder) => ({
    // GET all doctors
    getDoctors: builder.query<TDoctor[], void>({
      query: () => "/doctor",
      providesTags: ["Doctors"],
    }),

    // GET doctor by ID
    getDoctorById: builder.query<TDoctor, number>({
      query: (doctor_id) => `/doctor/${doctor_id}`,
      providesTags: ["Doctors"],
    }),

    // CREATE doctor
    createDoctor: builder.mutation<TDoctor, Partial<TDoctor>>({
      query: (newDoctor) => ({
        url: "/doctor",
        method: "POST",
        body: newDoctor,
      }),
      invalidatesTags: ["Doctors"],
    }),

    // UPDATE doctor
    updateDoctor: builder.mutation<
      TDoctor,
      Partial<TDoctor> & { doctor_id: number }
    >({
      query: ({ doctor_id, ...updates }) => ({
        url: `/doctor/${doctor_id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Doctors"],
    }),

    // DELETE doctor
    deleteDoctor: builder.mutation<{ success: boolean; id: number }, number>({
      query: (doctor_id) => ({
        url: `/doctor/${doctor_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctors"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorsAPI;
