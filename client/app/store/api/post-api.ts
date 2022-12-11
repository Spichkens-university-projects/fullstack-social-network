import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { API_SERVER } from "../../api/axios";
import { IComment, IPost } from "../../components/types/post.interface";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { CreatePostDto } from "../dto/create-post.dto";
import { ReplyCommentDto } from "../dto/reply-comment.dto";

import { TypeRootState } from "../store";

export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["POSTS", "USER_POSTS", "NEWS_POSTS"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_SERVER,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as TypeRootState).auth.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getRelatedPosts: build.query<IPost[], null>({
      query: () => ({
        url: `/post/related`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["NEWS_POSTS"],
    }),
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
      invalidatesTags: () => ["USER_POSTS", "NEWS_POSTS"],
    }),
    deletePost: build.mutation<IPost, number | undefined>({
      query: (postId) => ({
        url: `/post/delete/${postId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: () => ["USER_POSTS", "NEWS_POSTS"],
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
    replyComment: build.mutation<
      IComment & { postId: number },
      ReplyCommentDto
    >({
      query: ({ commentatorId, parentId, commentBody }) => ({
        url: `/comment/reply`,
        method: "POST",
        credentials: "include",
        params: { commentatorId, parentId },
        body: commentBody,
      }),
      invalidatesTags: (result, error) => [
        { type: "POSTS", id: result?.postId },
      ],
    }),
    commentPost: build.mutation<IComment, CreateCommentDto>({
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
    deleteComment: build.mutation<IComment, number | undefined>({
      query: (commentId) => ({
        url: `/comment/delete`,
        method: "DELETE",
        credentials: "include",
        params: { commentId },
      }),
      invalidatesTags: (result, error) => [
        { type: "POSTS", id: result?.post.id },
      ],
    }),
  }),
});
