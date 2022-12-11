import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { API_SERVER } from "../../api/axios";
import { IUser } from "../../components/types/user.interface";

import { TypeRootState } from "../store";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["SINGLE_USER", "UNKNOWN_USERS"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_SERVER,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as TypeRootState).auth.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUserData: build.query<IUser, number | undefined>({
      query: (id) => `/user/byId/${id}`,
      providesTags: ["SINGLE_USER"],
    }),
  }),
});
