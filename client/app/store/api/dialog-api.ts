import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { API_SERVER } from "../../api/axios";
import { IDialog } from "../../components/types/dialog.interface";

import { TypeRootState } from "../store";

export const dialogApi = createApi({
  reducerPath: "dialogApi",
  tagTypes: ["DIALOGS"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_SERVER,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as TypeRootState).auth.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUserDialogs: build.query<IDialog[], null>({
      query: () => ({
        url: "/dialog/all",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["DIALOGS"],
    }),
    createDialog: build.mutation<IDialog, number | undefined>({
      query: (withUserId) => ({
        url: "/dialog/create",
        method: "POST",
        credentials: "include",
        params: { with: withUserId },
      }),
    }),
    deleteDialog: build.mutation<boolean, string>({
      query: (roomId) => ({
        url: "/dialog/delete",
        method: "DELETE",
        credentials: "include",
        params: { roomId },
      }),
      invalidatesTags: () => ["DIALOGS"],
    }),
    getDialogByRoomId: build.query<IDialog, string>({
      query: (roomId) => `/dialog/byRoomId/${roomId}`,
    }),
  }),
});
