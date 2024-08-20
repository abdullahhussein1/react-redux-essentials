import { useGetUsersQuery } from "../api/apiSlice";

interface PostAuthorProps {
  userId: string;
  showPrefix?: boolean;
}

export const PostAuthor = ({ userId, showPrefix = true }: PostAuthorProps) => {
  const { data: users = [] } = useGetUsersQuery();

  const author = users.find((user) => user.id === userId);

  return (
    <span>
      {showPrefix ? "by " : null}
      {author?.name ?? "Unknown author"}
    </span>
  );
};
