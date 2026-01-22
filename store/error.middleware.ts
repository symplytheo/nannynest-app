import { isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { Alert } from "react-native";

/**
 * Error handling middleware for RTK Query
 * Displays user-friendly error messages when API calls fail
 */
export const errorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // Check if this is a rejected action with a value
  if (isRejectedWithValue(action)) {
    const { payload } = action;

    let errorMessage = "An unexpected error occurred";

    // Handle different error response structures
    if (payload) {
      if (typeof payload === "string") {
        errorMessage = payload;
      } else if (typeof payload === "object") {
        // Handle structured error responses
        if ("data" in payload && payload.data) {
          const data = payload.data as any;

          // Try to extract message from various formats
          if (typeof data === "string") {
            errorMessage = data;
          } else if (data.message) {
            errorMessage = data.message;
          } else if (data.error) {
            errorMessage = data.error;
          }

          // Handle validation errors
          if (data.errors && typeof data.errors === "object") {
            const firstError = Object.values(data.errors)[0];
            if (Array.isArray(firstError) && firstError.length > 0) {
              errorMessage = firstError[0] as string;
            }
          }
        } else if ("error" in payload) {
          errorMessage = String(payload.error);
        } else if ("message" in payload) {
          errorMessage = String(payload.message);
        }
      }
    }

    // Handle specific HTTP status codes
    if (payload && typeof payload === "object" && "status" in payload) {
      const status = payload.status;

      switch (status) {
        case 401:
          errorMessage = "Session expired. Please log in again.";
          break;
        case 403:
          errorMessage = "You do not have permission to perform this action.";
          break;
        case 404:
          errorMessage = "The requested resource was not found.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        case 503:
          errorMessage = "Service temporarily unavailable. Please try again later.";
          break;
        case "FETCH_ERROR":
          errorMessage = "Network error. Please check your connection.";
          break;
        case "TIMEOUT_ERROR":
          errorMessage = "Request timed out. Please try again.";
          break;
      }
    }

    // Display error alert
    Alert.alert("Error", errorMessage, [{ text: "OK", style: "default" }]);

    // Log error in development
    if (__DEV__) {
      console.error("API Error:", action);
    }
  }

  return next(action);
};
