import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Customers", "Suppliers", "Items"],
  endpoints: (build) => ({
    /* auth endpoints */
    login: build.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    /* general endpoint */
    getUser: build.query({
      query: (id) => `/user/${id}`,
      providesTags: ["User"],
    }),
    /* client endpoints */
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
    getSuppliers: build.query({
      query: () => `client/suppliers`,
      providesTags: ["Suppliers"],
    }),
    createSupplier: build.mutation({
      query: (supplier, userId) => ({
        url: "client/suppliers",
        method: "POST",
        body: { ...supplier, ...userId }, // Include the userId in the request body
      }),
      invalidatesTags: ["Suppliers"],
    }),
    deleteSupplier: build.mutation({
      query: (id) => ({
        url: `client/suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Suppliers"],
    }),
    editSupplier: build.mutation({
      query: ({ id, supplier }) => ({
        url: `client/suppliers/${id}`,
        method: "PUT", // or "PATCH" depending on your API
        body: supplier,
      }),
      invalidatesTags: ["Suppliers"],
    }),
    /* product endpoints */
    getItems: build.query({
      query: () => `product/items`,
      providesTags: ["Items"],
    }),
    createItem: build.mutation({
      query: (formData, userId) => ({
        url: "product/items",
        method: "POST",
        body: formData, // Include the userId in the request body
      }),
      invalidatesTags: ["Items"],
    }),
    deleteItem: build.mutation({
      query: (id) => ({
        url: `product/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
    }),
    editItem: build.mutation({
      query: ({ id, item }) => ({
        url: `product/items/${id}`,
        method: "PUT", // or "PATCH" depending on your API
        body: item,
      }),
      invalidatesTags: ["Items"],
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
  useGetSuppliersQuery,
  useCreateSupplierMutation,
  useDeleteSupplierMutation,
  useEditSupplierMutation,
  useGetItemsQuery,
  useCreateItemMutation,
  useDeleteItemMutation,
  useEditItemMutation,
} = api;
