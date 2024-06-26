import { AppConfig } from "@/constants/app.config";
import { Status } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const apiCheckout = createApi({
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery(),
  tagTypes: ["Checkout"],
  reducerPath: "apiCheckout",
  endpoints: (builder) => ({
    getCheckouts: builder.query({
      queryFn: () => axios.get(`${AppConfig.apiUrl}/checkout`),
      providesTags: ["Checkout"],
    }),
    getCheckoutByStatus: builder.query({
      queryFn: (status: Status) =>
        axios.get(`${AppConfig.apiUrl}/checkout?status=${status}`),
      providesTags: ["Checkout"],
    }),
    getCheckoutByUserId: builder.query({
      queryFn: (id) => axios.get(`${AppConfig.apiUrl}/checkout?userId=${id}`),
      providesTags: ["Checkout"],
    }),
    deleteCheckout: builder.mutation({
      queryFn: (id) => axios.delete(`${AppConfig.apiUrl}/checkout?id=${id}`),
      invalidatesTags: ["Checkout"],
    }),

    postCheckout: builder.mutation({
      queryFn: (data) => axios.post(`${AppConfig.apiUrl}/checkout`, data),
      invalidatesTags: ["Checkout"],
    }),
    updateCheckout: builder.mutation({
      queryFn: ({ id, ...data }) =>
        axios.patch(`${AppConfig.apiUrl}/checkout?id=${id}`, data),
      invalidatesTags: ["Checkout"],
    }),
  }),
});

export const {
  useGetCheckoutsQuery,
  useGetCheckoutByUserIdQuery,
  usePostCheckoutMutation,
  useGetCheckoutByStatusQuery,
  useDeleteCheckoutMutation,
  useUpdateCheckoutMutation,
} = apiCheckout;
