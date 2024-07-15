import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Users from "./components/users";
import Posts from "./components/posts/Posts";
import Post from "./components/users/Post";
import CommentsList from "./components/comments/CommentsList";
import PostComments from "./components/posts/PostComments";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Users />} />
            <Route path="users" element={<Users />} />
            <Route path="posts" element={<Posts />} />
            <Route path="comments" element={<CommentsList />} />
            <Route path="/users/:userId/posts" element={<Post />} />
            <Route path="/comments?postId=postId" element={<PostComments />} />

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
