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
      query: () => `client/customers`,
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
    deleteCustomer: build.mutation({
      query: (id) => ({
        url: `client/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customers"],
    }),
    editCustomer: build.mutation({
      query: ({ id, customer }) => ({
        url: `client/customers/${id}`,
        method: "PUT", // or "PATCH" depending on your API
        body: customer,
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
  useDeleteCustomerMutation,
  useEditCustomerMutation,
} = api;
