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
          <Route path="/" element={<LoginPage />}></Route>
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts" element={<PostsMainPage />} />
                  <Route path="/posts/:postId" element={<SinglePostPage />} />
                  <Route path="/editPost/:postId" element={<EditPostForm />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
