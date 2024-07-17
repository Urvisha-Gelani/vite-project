import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Users from "./components/users";
// import Posts from "./components/posts/Posts";
import CommentsList from "./components/comments/CommentsList";
import Albums from "./components/albums/Albums";
import AllPosts from "./components/posts/AllPosts";
// import Profile from "./components/users/Profile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Users />} />
            <Route path="users" element={<Users />} />
            <Route path="posts" element={<AllPosts />} />
            <Route path="comments" element={<CommentsList />}/>
            <Route path="albums" element={<Albums />}/>
            {/* <Route path="/users/:userId/posts" element={<Posts />} /> */}
            {/* <Route path="/users/:userId" element={<Profile />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
