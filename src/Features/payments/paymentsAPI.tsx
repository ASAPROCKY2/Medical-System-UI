import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APIDomain";
import type { RootState } from "../../app/store";

// Payment type
export type TPayment = {
  payment_id: number;
  appointment_id: number;
  amount: number;
  payment_status: "pending" | "paid" | "failed" | "refunded" | "cancelled";
  user_id?: number | null;
  transaction_id?: string | null;
  payment_date?: string | null;
  created_at?: string;
  updated_at?: string;
};

export const paymentsAPI = createApi({
  reducerPath: "paymentsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Payments"],
  endpoints: (builder) => ({
    getPayments: builder.query<TPayment[], void>({
      query: () => "/payments",
      providesTags: ["Payments"],
    }),

    createPayment: builder.mutation<{ message: string }, Partial<TPayment>>({
      query: (data) => ({
        url: "/payments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payments"],
    }),

    updatePayment: builder.mutation<{ message: string }, { id: number } & Partial<TPayment>>({
      query: ({ id, ...data }) => ({
        url: `/payments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Payments"],
    }),

    deletePayment: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentsAPI;
