import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APIDomain";


export type TLoginResponse = {
  token: string;
  user: {
    user_id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    doctor_id?: number | null;
    image_url?: string | null;
  };
};

export type LoginInputs = {
  email: string;
  password: string;
};

export const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
  }),
  tagTypes: ["Login"],
  endpoints: (builder) => ({
    loginUser: builder.mutation<TLoginResponse, LoginInputs>({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["Login"],
    }),
  }),
});

export const { useLoginUserMutation } = loginAPI;
