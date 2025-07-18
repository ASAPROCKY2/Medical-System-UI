// src/features/prescriptions/prescriptionsAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APIDomain";
import type { RootState } from "../../app/store";

// Match your prescriptions table schema
export type TPrescription = {
  prescription_id: number;
  appointment_id: number;
  doctor_id: number;
  patient_id: number;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
  // populated relations if returned from backend
  doctor?: { doctor_id: number; name: string };
  patient?: { user_id: number; name: string };
  appointment?: { appointment_id: number; appointment_date: string; time_slot?: string };
};

export const prescriptionsAPI = createApi({
  reducerPath: "prescriptionsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain, // e.g. http://localhost:5000
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Prescriptions"],
  endpoints: (builder) => ({
    // GET all prescriptions
    getPrescriptions: builder.query<TPrescription[], void>({
      query: () => "/prescriptions",
      transformResponse: (response: { data?: TPrescription[] } | TPrescription[]) => {
        if (Array.isArray(response)) return response;
        return response.data ?? [];
      },
      providesTags: ["Prescriptions"],
    }),

    // GET a prescription by ID
    getPrescriptionById: builder.query<TPrescription, number>({
      query: (id) => `/prescriptions/${id}`,
      transformResponse: (response: { data?: TPrescription } | TPrescription) => {
        if ("data" in response) return response.data!;
        return response as TPrescription;
      },
      providesTags: (_res, _err, id) => [{ type: "Prescriptions", id }],
    }),

    // GET by doctor
    getPrescriptionsByDoctor: builder.query<TPrescription[], number>({
      query: (doctorID) => `/prescriptions/doctor/${doctorID}`,
      transformResponse: (response: { data?: TPrescription[] } | TPrescription[]) => {
        if (Array.isArray(response)) return response;
        return response.data ?? [];
      },
      providesTags: ["Prescriptions"],
    }),

    // GET by patient
    getPrescriptionsByPatient: builder.query<TPrescription[], number>({
      query: (userID) => `/prescriptions/patient/${userID}`,
      transformResponse: (response: { data?: TPrescription[] } | TPrescription[]) => {
        if (Array.isArray(response)) return response;
        return response.data ?? [];
      },
      providesTags: ["Prescriptions"],
    }),

    // GET full details
    getFullPrescriptionDetails: builder.query<TPrescription, number>({
      query: (id) => `/prescriptions/full/${id}`,
      transformResponse: (response: { data?: TPrescription } | TPrescription) => {
        if ("data" in response) return response.data!;
        return response as TPrescription;
      },
      providesTags: (_res, _err, id) => [{ type: "Prescriptions", id }],
    }),

    // CREATE
    createPrescription: builder.mutation<{ message: string }, Omit<TPrescription, "prescription_id" | "created_at" | "updated_at">>({
      query: (newPrescription) => ({
        url: "/prescriptions",
        method: "POST",
        body: newPrescription,
      }),
      invalidatesTags: ["Prescriptions"],
    }),

    // UPDATE
    updatePrescription: builder.mutation<
      { message: string },
      { prescription_id: number } & Partial<Omit<TPrescription, "prescription_id">>
    >({
      query: ({ prescription_id, ...updates }) => ({
        url: `/prescriptions/${prescription_id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (_res, _err, { prescription_id }) => [
        "Prescriptions",
        { type: "Prescriptions", id: prescription_id },
      ],
    }),

    // DELETE
    deletePrescription: builder.mutation<{ message: string }, number>({
      query: (prescription_id) => ({
        url: `/prescriptions/${prescription_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Prescriptions"],
    }),
  }),
});

export const {
  useGetPrescriptionsQuery,
  useGetPrescriptionByIdQuery,
  useGetPrescriptionsByDoctorQuery,
  useGetPrescriptionsByPatientQuery,
  useGetFullPrescriptionDetailsQuery,
  useCreatePrescriptionMutation,
  useUpdatePrescriptionMutation,
  useDeletePrescriptionMutation,
} = prescriptionsAPI;
