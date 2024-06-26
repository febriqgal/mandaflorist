import { AppConfig } from "@/constants/app.config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const apiProduct = createApi({
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery(),
  tagTypes: ["Product"],
  reducerPath: "apiProduct",
  endpoints: (builder) => ({
    getProducts: builder.query({
      queryFn: () => axios.get(`${AppConfig.apiUrl}/product`),
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      queryFn: (id) => axios.get(`${AppConfig.apiUrl}/product?id=${id}`),
      providesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      queryFn: (id) => axios.delete(`${AppConfig.apiUrl}/product?id=${id}`),
      invalidatesTags: ["Product"],
    }),

    postProduct: builder.mutation({
      queryFn: (data) => axios.post(`${AppConfig.apiUrl}/product`, data),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      queryFn: ({ id, ...data }) =>
        axios.patch(`${AppConfig.apiUrl}/product?id=${id}`, data),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  usePostProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = apiProduct;
