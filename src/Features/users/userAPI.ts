import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APIDomain"; //  fixed path
// Removed RootState import because we are not using getState anymore

//  User type based on your hospital system backend
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

export const usersAPI = createApi({
  reducerPath: "usersAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers) => {
      //  removed auth lookup since no auth slice exists yet
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    //  Register a new user
    createUsers: builder.mutation<TUser, Partial<TUser>>({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),

    //  Verify user after registration (if backend supports it)
    verifyUser: builder.mutation<{ message: string }, { email: string; code: string }>({
      query: (data) => ({
        url: "/auth/verify",
        method: "POST",
        body: data,
      }),
    }),

    //  Get all users
    getUsers: builder.query<TUser[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    //  Update a user by ID
    updateUser: builder.mutation<TUser, Partial<TUser> & { id: number }>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),

    //  Get a single user by ID
    getUserById: builder.query<TUser, number>({
      query: (id) => `/users/${id}`,
    }),

    //  Delete user if needed
    deleteUser: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

//  Export the auto‑generated hooks
export const {
  useCreateUsersMutation,
  useVerifyUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useDeleteUserMutation,
} = usersAPI;
