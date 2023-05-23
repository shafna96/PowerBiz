import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Customers"],
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getCustomers: build.query({
      query: (id) => `client/customers/${id}`,
      providesTags: ["Customers"],
    }),
    createCustomer: build.mutation({
      query: (customer, userId) => ({
        url: "client/customers",
        method: "POST",
        body: { ...customer, ...userId }, // Include the userId in the request body
      }),
      invalidatesTags: ["Customers"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useGetCustomersQuery,
  useCreateCustomerMutation,
} = api;
