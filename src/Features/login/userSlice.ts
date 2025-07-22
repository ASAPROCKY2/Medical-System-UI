import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  token: string | null;
  user: {
    user_id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    doctor_id?: number | null; 
  } | null;
};

const initialState: UserState = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        token: string;
        user: {
          user_id: number;
          firstname: string;
          lastname: string;
          email: string;
          role: string;
          doctor_id?: number | null;
        };
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
