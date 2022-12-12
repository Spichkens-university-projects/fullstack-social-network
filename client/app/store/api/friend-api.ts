import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { API_SERVER } from "../../api/axios";
import { IFriend } from "../../components/types/friend.interface";
import { IUser } from "../../components/types/user.interface";

import { TypeRootState } from "../store";

export const friendApi = createApi({
  reducerPath: "friendApi",
  tagTypes: ["SUBSCRIBES", "SUBSCRIBERS", "FRIENDS", "UNKNOWN_USERS"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_SERVER,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as TypeRootState).auth.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getSubscribes: build.query<IFriend[], null>({
      query: (userId) => ({
        url: `/relationship/subscribes`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["SUBSCRIBES"],
    }),
    getSubscribers: build.query<IFriend[], null>({
      query: (userId) => ({
        url: `/relationship/subscribers`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["SUBSCRIBERS"],
    }),
    getFriends: build.query<IFriend[], number | undefined>({
      query: (userId) => ({
        url: `/relationship/friends`,
        method: "GET",
        credentials: "include",
        params: { of: userId },
      }),
      providesTags: ["FRIENDS"],
    }),
    getAllUnknownUsers: build.query<IUser[], string>({
      query: (searchTerm) => ({
        url: `/user/unknown`,
        method: "GET",
        params: { searchTerm },
      }),
      providesTags: ["UNKNOWN_USERS"],
    }),
    sendRequest: build.mutation<boolean, number | undefined>({
      query: (toUserId) => ({
        url: `/relationship/send-request/${toUserId}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: () => ["SUBSCRIBES"],
    }),
    cancelRequest: build.mutation<boolean, number | undefined>({
      query: (toUserId) => ({
        url: `/relationship/cancel-request/${toUserId}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: () => ["SUBSCRIBES", "UNKNOWN_USERS"],
    }),
    acceptRequest: build.mutation<boolean, number | undefined>({
      query: (fromUserId) => ({
        url: `/relationship/accept-request/${fromUserId}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: () => ["SUBSCRIBERS", "FRIENDS"],
    }),
    rejectRequest: build.mutation<boolean, number | undefined>({
      query: (fromUserId) => ({
        url: `/relationship/reject-request/${fromUserId}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: () => ["SUBSCRIBERS", "UNKNOWN_USERS"],
    }),
    removeFriend: build.mutation<boolean, number | undefined>({
      query: (fromUserId) => ({
        url: `/relationship/remove-friend/${fromUserId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: () => ["FRIENDS", "SUBSCRIBERS"],
    }),
  }),
});
