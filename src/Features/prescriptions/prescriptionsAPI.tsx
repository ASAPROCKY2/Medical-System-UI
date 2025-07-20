// src/features/prescriptions/prescriptionsAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APIDomain";

// Match your prescriptions table schema and backend response
export type TPrescription = {
  prescription_id: number;
  appointment_id: number;
  doctor_id: number;
  patient_id: number;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;

  doctor?: {
    doctor_id: number;
    first_name: string;
    last_name: string;
    specialization?: string | null;
    contact_phone?: string | null;
    available_days?: string | null;
    created_at?: string;
    updated_at?: string;
  };
  patient?: {
    user_id: number;
    firstname: string;
    lastname: string;
    email: string;
    contact_phone?: string | null;
    address?: string | null;
    role?: string;
    created_at?: string;
    updated_at?: string;
  };
  appointment?: {
    appointment_id: number;
    user_id: number;
    doctor_id: number;
    appointment_date: string;
    time_slot?: string | null;
    total_amount?: string | null;
    appointment_status?: string;
    created_at?: string;
    updated_at?: string;
  };
};

export const prescriptionsAPI = createApi({
  reducerPath: "prescriptionsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
  }),
  tagTypes: ["Prescriptions"],
  endpoints: (builder) => ({
    // GET all prescriptions
    getPrescriptions: builder.query<TPrescription[], void>({
      query: () => "/prescriptions",
      transformResponse: (response: any) => {
        if (response && Array.isArray(response.data)) {
          return response.data;
        }
        if (Array.isArray(response)) {
          return response;
        }
        return [];
      },
      providesTags: ["Prescriptions"],
    }),

    // GET a prescription by ID
    getPrescriptionById: builder.query<TPrescription, number>({
      query: (id) => `/prescriptions/${id}`,
      transformResponse: (response: any) => {
        if (response && typeof response === "object" && "data" in response) {
          return response.data as TPrescription;
        }
        return response as TPrescription;
      },
      providesTags: (_res, _err, id) => [{ type: "Prescriptions", id }],
    }),

    // GET by doctor
    getPrescriptionsByDoctor: builder.query<TPrescription[], number>({
      query: (doctorID) => `/prescriptions/doctor/${doctorID}`,
      transformResponse: (response: any) => {
        if (response && Array.isArray(response.data)) {
          return response.data;
        }
        if (Array.isArray(response)) {
          return response;
        }
        return [];
      },
      providesTags: ["Prescriptions"],
    }),

    // GET by patient
    getPrescriptionsByPatient: builder.query<TPrescription[], number>({
      query: (userID) => `/prescriptions/patient/${userID}`,
      transformResponse: (response: any) => {
        if (response && Array.isArray(response.data)) {
          return response.data;
        }
        if (Array.isArray(response)) {
          return response;
        }
        return [];
      },
      providesTags: ["Prescriptions"],
    }),

    // GET full details
    getFullPrescriptionDetails: builder.query<TPrescription, number>({
      query: (id) => `/prescriptions/full/${id}`,
      transformResponse: (response: any) => {
        if (response && typeof response === "object" && "data" in response) {
          return response.data as TPrescription;
        }
        return response as TPrescription;
      },
      providesTags: (_res, _err, id) => [{ type: "Prescriptions", id }],
    }),

    // CREATE
    createPrescription: builder.mutation<
      { message: string },
      Omit<TPrescription, "prescription_id" | "created_at" | "updated_at">
    >({
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
