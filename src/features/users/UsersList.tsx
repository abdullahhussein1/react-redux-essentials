import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { useGetUsersQuery } from "../api/apiSlice";
import { Spinner } from "@/components/Spinner";

export const UsersList = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const currentUserId = useAppSelector((state) => state.auth.username);

  const currentUser = users.find((user) => user.id === currentUserId);

  if (isLoading) return <Spinner text="Loading..." />;

  const filteredUsers = users.filter((user) => user.id !== currentUser?.id);

  const renderedUsers = filteredUsers.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  );
};
