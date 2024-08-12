import React from "react";
import { AddPostForm } from "./AddPostForm";
import { PostsList } from "./PostsList";

type Props = {};

export default function PostsMainPage({}: Props) {
  return (
    <>
      <AddPostForm />
      <PostsList />
    </>
  );
}
