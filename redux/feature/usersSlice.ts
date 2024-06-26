import { AppConfig } from "@/constants/app.config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const apiUser = createApi({
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery(),
  tagTypes: ["User"],
  reducerPath: "apiUser",
  endpoints: (builder) => ({
    getUsers: builder.query({
      queryFn: () => axios.get(`${AppConfig.apiUrl}/user`),
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      queryFn: (id) => axios.get(`${AppConfig.apiUrl}/user?id=${id}`),
    }),
    postUser: builder.mutation({
      queryFn: (payload) => axios.post(`${AppConfig.apiUrl}/user`, payload),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      queryFn: ({ id, ...payload }) =>
        axios.patch(`${AppConfig.apiUrl}/user?id=${id}`, payload),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  usePostUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = apiUser;
