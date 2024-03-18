import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IAuthRequest, IAuthResponse } from "../types/auth"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com/auth/login",
  }),
  endpoints: (builder) => ({
    getToken: builder.mutation<IAuthResponse, IAuthRequest>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const { useGetTokenMutation } = authApi
