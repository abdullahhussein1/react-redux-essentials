import { Link, useParams } from "react-router-dom";

import { useAppSelector } from "@/app/hooks";
import { selectPostsByUser } from "@/features/posts/postsSlice";

import { useGetUsersQuery } from "../api/apiSlice";

export const UserPage = () => {
  const { userId } = useParams();

  const { data: users = [] } = useGetUsersQuery();

  const user = users.find((user) => user.id === userId);

  const postsForUser = useAppSelector((state) =>
    selectPostsByUser(state, userId!)
  );

  if (!user) {
    return (
      <section>
        <h2>User not found!</h2>
      </section>
    );
  }

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  );
};
