import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Navbar } from "./components/Navbar";
import PostsMainPage from "./features/posts/PostsMainPage";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { EditPostForm } from "./features/posts/EditPostForm";
import { LoginPage } from "./features/auth/LoginPage";
import { useAppSelector } from "./app/hooks";
import { selectCurrentUsername } from "./features/auth/authSlice";
import { UsersList } from "./features/users/UsersList";
import { UserPage } from "./features/users/UserPage";
import { NotificationsList } from "./features/notifications/NotificationsList";
import { ToastContainer } from "react-tiny-toast";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = useAppSelector(selectCurrentUsername);

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" Component={LoginPage}></Route>
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts" Component={PostsMainPage} />
                  <Route path="/posts/:postId" Component={SinglePostPage} />
                  <Route path="/editPost/:postId" Component={EditPostForm} />
                  <Route path="/users" Component={UsersList} />
                  <Route
                    path="/notifications"
                    element={<NotificationsList />}
                  />{" "}
                  <Route path="/users/:userId" Component={UserPage} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
