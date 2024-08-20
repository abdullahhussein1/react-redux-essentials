import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { UserIcon } from "./UserIcon";
import {
  fetchNotifications,
  selectUnreadNotificationsCount,
} from "@/features/notifications/notificationsSlice";
import {
  useGetUsersQuery,
  useLogoutUserMutation,
} from "@/features/api/apiSlice";
import { setUser } from "@/features/auth/authSlice";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutUserMutation();
  const currentUserId = useAppSelector((state) => state.auth.username);

  const { data: users = [] } = useGetUsersQuery();

  const user = users.find((user) => user.id === currentUserId);

  const navigate = useNavigate();

  const numUnreadNotifications = useAppSelector(selectUnreadNotificationsCount);

  const isLoggedIn = !!user;

  let navContent: React.ReactNode = null;

  if (isLoggedIn) {
    const onLogoutClicked = () => {
      logout();
      dispatch(setUser(null));
    };

    const fetchNewNotifications = () => {
      dispatch(fetchNotifications());
    };

    let unreadNotificationsBadge: React.ReactNode | undefined;

    if (numUnreadNotifications > 0) {
      unreadNotificationsBadge = (
        <span className="badge">{numUnreadNotifications}</span>
      );
    }

    navContent = (
      <div className="navContent">
        <div className="navLinks">
          <Link to="/posts">Posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/notifications">
            Notifications {unreadNotificationsBadge}
          </Link>
          <button className="button small" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
        <div className="userDetails">
          <div
            onClick={() => navigate(`/users/${user.id}`)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
          >
            <UserIcon size={32} />
            {user.name}
          </div>
          <button className="button small" onClick={onLogoutClicked}>
            Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>
        {navContent}
      </section>
    </nav>
  );
};
