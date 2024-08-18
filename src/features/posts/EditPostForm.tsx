import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useEditPostMutation, useGetPostQuery } from "../api/apiSlice";

interface EditPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement;
  postContent: HTMLTextAreaElement;
}
interface EditPostFormElements extends HTMLFormElement {
  readonly elements: EditPostFormFields;
}

export const EditPostForm = () => {
  const { postId } = useParams();
  const [updatePost] = useEditPostMutation();

  const { data: post } = useGetPostQuery(postId!);

  const navigate = useNavigate();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onSavePostClicked = async (e: React.FormEvent<EditPostFormElements>) => {
    // Prevent server submission
    e.preventDefault();

    const { elements } = e.currentTarget;
    const title = elements.postTitle.value;
    const content = elements.postContent.value;

    if (title && content) {
      await updatePost({ id: post.id, title, content });
      navigate(`/posts/${postId}`);
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={onSavePostClicked}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          defaultValue={post.title}
          required
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          defaultValue={post.content}
          required
        />

        <button>Save Post</button>
      </form>
    </section>
  );
};
