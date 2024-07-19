import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Users from "./components/users";
import CommentsList from "./components/comments/CommentsList";
import Albums from "./components/albums/Albums";
import AllPosts from "./components/posts/AllPosts";

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
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
