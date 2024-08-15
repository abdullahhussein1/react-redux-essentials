import { Link } from "react-router-dom";

import { useAppSelector } from "@/app/hooks";

import { selectAllUsers, selectCurrentUser } from "./usersSlice";

export const UsersList = () => {
  const users = useAppSelector(selectAllUsers);
  const currentUser = useAppSelector(selectCurrentUser);

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
