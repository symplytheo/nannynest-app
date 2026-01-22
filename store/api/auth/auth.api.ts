import { baseApi } from "../api";
import type {
  AuthResponse,
  ChangePasswordRequest,
  CreateNewPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
  User,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyResetCodeRequest,
} from "./auth.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Register
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Verify Email
    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // Resend Verification Code
    resendVerificationCode: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: "/auth/resend-verification",
        method: "POST",
        body: data,
      }),
    }),

    // Reset Password - Send Code
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // Verify Reset Code
    verifyResetCode: builder.mutation<{ valid: boolean; message: string }, VerifyResetCodeRequest>({
      query: (data) => ({
        url: "/auth/verify-reset-code",
        method: "POST",
        body: data,
      }),
    }),

    // Create New Password
    createNewPassword: builder.mutation<{ message: string }, CreateNewPasswordRequest>({
      query: (data) => ({
        url: "/auth/create-new-password",
        method: "POST",
        body: data,
      }),
    }),

    // Change Password (Authenticated)
    changePassword: builder.mutation<{ message: string }, ChangePasswordRequest>({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Get Current User
    getCurrentUser: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["Auth", "User"],
    }),

    // Logout
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // Refresh Token
    refreshToken: builder.mutation<{ token: string }, { refreshToken: string }>({
      query: (data) => ({
        url: "/auth/refresh",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendVerificationCodeMutation,
  useResetPasswordMutation,
  useVerifyResetCodeMutation,
  useCreateNewPasswordMutation,
  useChangePasswordMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useRefreshTokenMutation,
} = authApi;
