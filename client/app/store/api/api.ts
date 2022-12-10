import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { API_SERVER } from "../../api/axios";
import { IFriend } from "../../components/types/friend.interface";
import { IPost } from "../../components/types/post.interface";
import { IUser } from "../../components/types/user.interface";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { CreatePostDto } from "../dto/create-post.dto";

import { TypeRootState } from "../store";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["USER", "FRIENDS", "POSTS", "USER_POSTS"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_SERVER,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as TypeRootState).auth.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    // USERS
    getUserData: build.query<IUser, number | undefined>({
      query: (id) => `/user/${id}`,
      providesTags: ["USER"],
    }),
    // FRIENDS
    getFriends: build.query<IFriend[], number | undefined>({
      query: (userId) => ({
        url: `/relationship/friends?of=${userId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["FRIENDS"],
    }),
    // POSTS
    getUsersPosts: build.query<IPost[], number | undefined>({
      query: (postId) => ({
        url: `/post`,
        method: "GET",
        credentials: "include",
        params: { of: postId },
      }),
      providesTags: ["USER_POSTS"],
    }),
    getPostById: build.query<IPost, number | undefined>({
      query: (postId) => ({
        url: `/post/byId`,
        method: "GET",
        credentials: "include",
        params: { postId },
      }),
      providesTags: (result, error, postId) => [{ type: "POSTS", id: postId }],
    }),
    createPost: build.mutation<IPost, CreatePostDto>({
      query: (body) => ({
        url: `/post/create`,
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: () => ["USER_POSTS"],
    }),
    deletePost: build.mutation<IPost, number | undefined>({
      query: (postId) => ({
        url: `/post/delete/${postId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: () => ["USER_POSTS"],
    }),
    likePost: build.mutation<IPost, number | undefined>({
      query: (postId) => ({
        url: `/like`,
        method: "POST",
        credentials: "include",
        params: { postId },
      }),
      invalidatesTags: (result, error, postId) => [
        { type: "POSTS", id: postId },
      ],
    }),
    // COMMENTS
    commentPost: build.mutation<IPost, CreateCommentDto>({
      query: (body) => ({
        url: `/comment/create`,
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "POSTS", id: postId },
      ],
    }),
  }),
});
