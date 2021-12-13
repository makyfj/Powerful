import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  age?: string;
  goal?: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}/api/user`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserResponse, RegisterRequest>({
      query: ({ name, email, password }) => ({
        url: "/register",
        method: "POST",
        body: { name, email, password },
      }),
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    user: builder.query<User, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const isFetchBaseQueryErrorType = (
  error: any
): error is FetchBaseQueryError => "status" in error;

export const { useLoginMutation, useRegisterUserMutation, useUserQuery } =
  userApi;
