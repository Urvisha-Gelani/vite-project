import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../common/common";
import useAppStore from "../../store/Appstore";
import Posts from "../posts/Posts";
import Spinner from "../spinner/Spinner";

function Post() {
  const { userId } = useParams();
  const { getPosts, getUser, user, loading } = useAppStore();
  const userPostUrl = `${apiUrl}/users/${userId}/posts`;
  useEffect(() => {
    getUser(Number(userId));
    getPosts(userPostUrl);
  }, [getPosts, userPostUrl, getUser, userId]);
  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner status={loading} />
      </div>
      ) : (
        <div>
          <p className="mb-0 fs-1 text-center">{user.name}</p>
        </div>
      )}
      {/* <Posts /> */}
    </>
  );
}

export default Post;
