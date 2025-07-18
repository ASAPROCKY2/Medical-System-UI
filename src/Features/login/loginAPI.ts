import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utilis/APIDomain";

// The expected response from your backend after successful login
export type TLoginResponse = {
  token: string;
  user: {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
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
