// src/features/users/usersAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APIDomain";


export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contactPhone: string;
  address: string;
  role: string;
  isVerified: boolean;
  image_url?: string;
};


export type TComplaintDetail = {
  complaint_id: number;
  description: string;
  created_at?: string;
  user?: {
    user_id: number;
    firstname: string;
    lastname: string;
    email?: string;
  } | null;
  appointment?: {
    appointment_id: number;
    appointment_date: string;
    doctor?: {
      doctor_id: number;
      first_name: string;
      last_name: string;
      specialization?: string;
    } | null;
  } | null;
};

export const usersAPI = createApi({
  reducerPath: "usersAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    // Register a new user
    createUsers: builder.mutation<TUser, Partial<TUser>>({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),

    // Verify user after registration
    verifyUser: builder.mutation<{ message: string }, { email: string; code: string }>({
      query: (data) => ({
        url: "/auth/verify",
        method: "POST",
        body: data,
      }),
    }),

    // Get all users
    getUsers: builder.query<TUser[], void>({
      query: () => "/users",
      transformResponse: (response: { data: any[] }) =>
        response.data.map((u) => ({
          id: u.user_id,
          firstName: u.firstname,
          lastName: u.lastname,
          email: u.email,
          password: u.password,
          contactPhone: u.contact_phone,
          address: u.address,
          role: u.role,
          isVerified: u.isVerified,
          image_url: u.image_url,
        })),
      providesTags: ["Users"],
    }),

    // Update a user by ID
    updateUser: builder.mutation<TUser, Partial<TUser> & { id: number }>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),

    // Get a single user by ID
    getUserById: builder.query<TUser, number>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: { data: any }) => ({
        id: response.data.user_id,
        firstName: response.data.firstname,
        lastName: response.data.lastname,
        email: response.data.email,
        password: response.data.password,
        contactPhone: response.data.contact_phone,
        address: response.data.address,
        role: response.data.role,
        isVerified: response.data.isVerified,
        image_url: response.data.image_url,
      }),
    }),

    // Delete a user by ID
    deleteUser: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // Get all complaints with details
    getAllComplaints: builder.query<TComplaintDetail[], void>({
      query: () => "/admin/complaints",
      transformResponse: (response: { data: TComplaintDetail[] }) => response.data,
    }),
  }),
});

// Export auto-generated hooks
export const {
  useCreateUsersMutation,
  useVerifyUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useGetAllComplaintsQuery,
} = usersAPI;
