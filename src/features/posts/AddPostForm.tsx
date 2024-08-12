import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/app/hooks";
import { type Post, postAdded } from "./postsSlice";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement;
  postContent: HTMLTextAreaElement;
  postAuthor: HTMLTextAreaElement;
}
interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields;
}

export const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const users = useSelector(selectAllUsers);

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const title = elements.postTitle.value;
    const content = elements.postContent.value;
    const userId = elements.postAuthor.value;

    dispatch(postAdded(title, content, userId));

    e.currentTarget.reset();
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" defaultValue="" required />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" name="postAuthor" required>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          defaultValue=""
          required
        />
        <button>Save Post</button>
      </form>
    </section>
  );
};
