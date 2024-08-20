import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Post, NewPost, PostUpdate } from "@/features/posts/postsSlice";
import type { User } from "../users/usersSlice";

export type { Post, NewPost, PostUpdate, User };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/fakeApi" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: (result = []) => [
        "Post",
        ...result.map(({ id }) => ({ type: "Post", id }) as const),
        { type: "Post", id: "LIST" },
      ],
    }),
    getPost: builder.query<Post, string>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: "Post", id: arg }],
    }),
    addNewPost: builder.mutation<Post, NewPost>({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    editPost: builder.mutation<Post, PostUpdate>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    getUsers: builder.query<User[], void>({
      query: () => "/users",
    }),
    loginUser: builder.mutation<User, string>({
      query: (username) => ({
        url: "/login",
        method: "POST",
        body: { username },
      }),
    }),
    logoutUser: builder.mutation<User, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetUsersQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
  useAddNewPostMutation,
  useEditPostMutation,
} = apiSlice;
