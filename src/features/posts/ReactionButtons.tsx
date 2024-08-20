export interface Reactions {
  thumbsUp: number;
  tada: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export type ReactionName = keyof Reactions;

export interface Post {
  id: string;
  title: string;
  content: string;
  user: string;
  date: string;
  reactions: Reactions;
}

const reactionEmoji: Record<ReactionName, string> = {
  thumbsUp: "👍",
  tada: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

interface ReactionButtonsProps {
  post: Post;
}

export const ReactionButtons = ({ post }: ReactionButtonsProps) => {
  const reactionButtons = Object.entries(reactionEmoji).map(
    ([stringName, emoji]) => {
      // Ensure TS knows this is a _specific_ string type
      const reaction = stringName as ReactionName;
      return (
        <button
          key={reaction}
          type="button"
          className="muted-button reaction-button"
        >
          {emoji} {post.reactions[reaction]}
        </button>
      );
    }
  );

  return <div>{reactionButtons}</div>;
};
