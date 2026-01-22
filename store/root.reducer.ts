import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/api";
import authReducer from "./slices/auth.slice";

/**
 * Root reducer combining all slices and API reducers
 */
export const rootReducer = combineReducers({
  // API reducer
  [baseApi.reducerPath]: baseApi.reducer,

  // Feature slices
  auth: authReducer,

  // Add more slices here as you create them
  // example: user: userReducer,
  // example: orders: ordersReducer,
});
