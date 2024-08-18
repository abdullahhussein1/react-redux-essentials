import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { selectCurrentUser } from "@/features/users/usersSlice";

import { UserIcon } from "./UserIcon";
import { logout } from "@/features/auth/authSlice";
import {
  fetchNotifications,
  selectUnreadNotificationsCount,
} from "@/features/notifications/notificationsSlice";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  const numUnreadNotifications = useAppSelector(selectUnreadNotificationsCount);

  const isLoggedIn = !!user;

  let navContent: React.ReactNode = null;

  if (isLoggedIn) {
    const onLogoutClicked = () => {
      dispatch(logout());
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
