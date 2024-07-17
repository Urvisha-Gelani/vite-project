/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CommentType, PostType } from "../../interface/interface";
import { Comment } from "react-loader-spinner";
import {
  apiUrl,
  loadPostsFromLocalStorage,
  toCamelCase,
} from "../../common/common";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const CommentsList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<PostType | null>(null);
  const postId = queryParams.get("postId");

  const commentsUrl = () => {
    return postId
      ? `${apiUrl}comments?postId=${postId}`
      : `${apiUrl}comments?_page=${page}&_limit=10`;
  };

  const showPostsComments = (postId: any) => {
    const allPosts = loadPostsFromLocalStorage().filter(
      (post: PostType) => post.id == postId
    );
    if (allPosts.length > 0) {
      setPosts(allPosts[0]);
    }
  };

  useEffect(() => {
    if (postId) {
      showPostsComments(postId);
    }
    setComments([]);
    setPage(1);
    fetchComments();
  }, [location.search]);

  const fetchComments = async () => {
    setLoading(true);
    const response = await axios.get(commentsUrl());
    setLoading(false);
    setComments((prevComments) => [...prevComments, ...response.data]);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {loading && comments.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner status={loading} />
        </div>
      ) : (
        <div>
          {postId && posts && (
            <div className="w-50 mx-auto border px-2 mt-3">
              <div>
                <h3 className=" text-center">Post</h3>
                <div>
                  <p className="">
                    <b>Title :</b> {posts.title}
                  </p>
                  <p className="">
                    <b>description : </b> {posts.body}
                  </p>
                </div>
              </div>
            </div>
          )}

          <p className={`text-center ${postId ? "fs-5" : "fs-2"}`}>Comments</p>
          <div className="d-flex mt-2">
            <InfiniteScroll
              dataLength={comments.length}
              next={fetchComments}
              hasMore={!postId && comments.length < 100}
              loader={
                <Comment
                  visible={!postId}
                  height="50"
                  width="80"
                  ariaLabel="comment-loading"
                  wrapperClass="comment-wrapper text-center"
                  color="#fff"
                  backgroundColor="#2E236C"
                />
              }
              endMessage={
                comments.length === 0 ? (
                  <p style={{ textAlign: "center" }}>
                    <b>No comments</b>
                  </p>
                ) : (
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                )
              }
            >
              <div className="w-100 d-flex flex-wrap justify-content-center gap-4">
                {comments.map((comment) => (
                  <div className="w-500px px-2 py-3 border" key={comment.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="w-20 text-center">
                        <span className="comment-icon">
                          {comment.name?.slice(0, 1).toUpperCase()}
                        </span>
                      </div>
                      <div className="w-80 text-left">
                        <b>{toCamelCase(comment.name)}</b>
                        <p>{comment.email}</p>
                      </div>
                    </div>
                    <div className="px-2 pt-3">
                      <p className="mb-0">{comment.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentsList;
