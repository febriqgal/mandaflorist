import { AppConfig } from "@/constants/app.config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const apiCart = createApi({
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${AppConfig.apiUrl}`,
  }),
  tagTypes: ["Cart"],
  reducerPath: "apiCart",
  endpoints: (builder) => ({
    getAllCart: builder.query({
      query: () => `Cart`.toLowerCase(),
      providesTags: ["Cart"],
    }),
    getCartById: builder.query({
      queryFn: (id) => axios.get(`${AppConfig.apiUrl}/cart?id=${id}`),
      providesTags: ["Cart"],
    }),
    getCartByUserId: builder.query({
      queryFn: (id) => axios.get(`${AppConfig.apiUrl}/cart?userId=${id}`),
      providesTags: ["Cart"],
    }),
    postCart: builder.mutation({
      queryFn: (data) => axios.post(`${AppConfig.apiUrl}/cart`, data),
      invalidatesTags: ["Cart"],
    }),
    deleteCartMany: builder.mutation({
      queryFn: (id) =>
        id.map((idd: string) =>
          axios.delete(`${AppConfig.apiUrl}/cart?ids=${idd}`)
        ),
      invalidatesTags: ["Cart"],
    }),

    deleteCart: builder.mutation({
      queryFn: (id) => axios.delete(`${AppConfig.apiUrl}/cart?id=${id}`),
    }),
    updateCart: builder.mutation({
      queryFn: ({ id, ...data }) =>
        axios.patch(`${AppConfig.apiUrl}/cart?id=${id}`, data),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetAllCartQuery,
  useGetCartByUserIdQuery,
  useGetCartByIdQuery,
  usePostCartMutation,
  useDeleteCartManyMutation,
  useDeleteCartMutation,
  useUpdateCartMutation,
} = apiCart;
