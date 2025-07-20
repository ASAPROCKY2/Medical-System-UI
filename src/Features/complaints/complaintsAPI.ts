// src/features/complaints/complaintsAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APIDomain";
import type { RootState } from "../../app/store";

// Basic complaint type
export type TComplaint = {
  complaint_id: number;
  user_id: number;
  doctor_id?: number | null;
  related_appointment_id?: number | null;
  subject: string;
  description?: string | null;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  created_at?: string;
  updated_at?: string;
  patient_name?: string | null;
  doctor_name?: string | null;
};

// Extended type for full details
export type TComplaintFull = {
  complaint_id: number;
  subject: string;
  description?: string | null;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  created_at?: string;
  updated_at?: string;
  user?: {
    user_id: number;
    full_name?: string;
    email?: string;
  } | null;
  doctor?: {
    doctor_id: number;
    full_name?: string;
    specialty?: string;
  } | null;
  appointment?: {
    appointment_id: number;
    date?: string;
  } | null;
};

export const complaintsAPI = createApi({
  reducerPath: "complaintsAPI",
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
  tagTypes: ["Complaints"],
  endpoints: (builder) => ({
    // GET all complaints (basic)
    getComplaints: builder.query<TComplaint[], void>({
      query: () => "/complaint",
      providesTags: ["Complaints"],
    }),

    // GET complaint by ID (basic)
    getComplaintById: builder.query<TComplaint, number>({
      query: (complaint_id) => `/complaint/${complaint_id}`,
      providesTags: ["Complaints"],
    }),

    // GET full complaint details (user, doctor, appointment)
    getComplaintFullDetails: builder.query<TComplaintFull, number>({
      query: (complaint_id) => `/complaint/full/${complaint_id}`,
      providesTags: ["Complaints"],
    }),

    //  (Optional) GET all complaints with full details
    // only if you add a backend route GET /complaint/full
    getComplaintsWithDetails: builder.query<TComplaintFull[], void>({
      query: () => `/complaint/full`,
      providesTags: ["Complaints"],
    }),

    // GET complaints by user
    getComplaintsByUser: builder.query<TComplaint[], number>({
      query: (user_id) => `/complaint/user/${user_id}`,
      providesTags: ["Complaints"],
    }),

    // GET complaints against a doctor
    getComplaintsByDoctor: builder.query<TComplaint[], number>({
      query: (doctor_id) => `/complaint/doctor/${doctor_id}`,
      providesTags: ["Complaints"],
    }),

    // CREATE complaint
    createComplaint: builder.mutation<TComplaint, Partial<TComplaint>>({
      query: (newComplaint) => ({
        url: "/complaint",
        method: "POST",
        body: newComplaint,
      }),
      invalidatesTags: ["Complaints"],
    }),

    // UPDATE complaint
    updateComplaint: builder.mutation<
      TComplaint,
      Partial<TComplaint> & { complaint_id: number }
    >({
      query: ({ complaint_id, ...updates }) => ({
        url: `/complaint/${complaint_id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Complaints"],
    }),

    // DELETE complaint
    deleteComplaint: builder.mutation<{ success: boolean; id: number }, number>({
      query: (complaint_id) => ({
        url: `/complaint/${complaint_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Complaints"],
    }),
  }),
});

export const {
  useGetComplaintsQuery,
  useGetComplaintByIdQuery,
  useGetComplaintFullDetailsQuery,   
  useGetComplaintsWithDetailsQuery, 
  useGetComplaintsByUserQuery,
  useGetComplaintsByDoctorQuery,
  useCreateComplaintMutation,
  useUpdateComplaintMutation,
  useDeleteComplaintMutation,
} = complaintsAPI;
