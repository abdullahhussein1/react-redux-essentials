import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "../../components/TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { selectCurrentUsername } from "../auth/authSlice";
import { useGetPostQuery } from "../api/apiSlice";
import { Spinner } from "@/components/Spinner";

export const SinglePostPage = () => {
  const { postId } = useParams();

  const currentUsername = useAppSelector(selectCurrentUsername);
  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId!);

  let content: React.ReactNode;

  const canEdit = currentUsername === post?.user;

  if (isFetching) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        {canEdit && (
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        )}
      </article>
    );
  }

  return <section>{content}</section>;
};
