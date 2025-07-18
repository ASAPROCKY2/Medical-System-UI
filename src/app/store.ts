import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { usersAPI } from "../Features/users/userAPI";
import { loginAPI } from "../Features/login/loginAPI";
import { appointmentsAPI } from "../Features/appointments/appointmentsAPI";
import { doctorsAPI } from "../Features/doctor/doctorAPI";
import { complaintsAPI } from "../Features/complaints/complaintsAPI";
import { prescriptionsAPI } from "../Features/prescriptions/prescriptionsAPI"; 
import userReducer from "../Features/login/userSlice";

// Persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"],
};

// Combine reducers
const rootReducer = combineReducers({
  [usersAPI.reducerPath]: usersAPI.reducer,
  [loginAPI.reducerPath]: loginAPI.reducer,
  [appointmentsAPI.reducerPath]: appointmentsAPI.reducer,
  [doctorsAPI.reducerPath]: doctorsAPI.reducer,
  [complaintsAPI.reducerPath]: complaintsAPI.reducer,
  [prescriptionsAPI.reducerPath]: prescriptionsAPI.reducer, 
  user: userReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      usersAPI.middleware,
      loginAPI.middleware,
      appointmentsAPI.middleware,
      doctorsAPI.middleware,
      complaintsAPI.middleware,
      prescriptionsAPI.middleware 
    ),
});

// Persistor
export const persistedStore = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
