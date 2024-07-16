import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CommentType } from "../../interface/interface";
import { Comment } from "react-loader-spinner";
import { apiUrl, toCamelCase } from "../../common/common";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import useAppStore from "../../store/Appstore";

const CommentsList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const { post, getPost } = useAppStore();
  const postId = queryParams.get("postId");

  const commentsUrl = () => {
    return postId
      ? `${apiUrl}comments?postId=${postId}`
      : `${apiUrl}comments?_page=${page}&_limit=10`;
  };

  useEffect(() => {
    postId ? getPost(Number(postId)) : null;
    setLoading(true);
    setComments([]);
    setPage(1);
    fetchComments();
  }, [location.search]);

  const fetchComments = async () => {
    // postId ? setLoading(true) : setLoading(false);
    setLoading(false);
    const response = await axios.get(commentsUrl());
    setTimeout(() => {
      setComments((prevComments) => [...prevComments, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    }, 1000);
  };

  return (
    <>
      {loading || comments.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner status={loading || comments.length === 0 ? true : loading} />
        </div>
      ) : (
        <div>
          <h1>Comments</h1>
          <h1 className="text-center fs-3">
            {postId ? toCamelCase(post.title) : ""}
          </h1>
          <div className="d-flex mt-2">
            <InfiniteScroll
              dataLength={comments.length}
              next={fetchComments}
              hasMore={postId || comments.length === 100 ? false : true}
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
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
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
                        <p>{comment.email}</p>
                      </div>
                    </div>
                    <div className="px-2 pt-3">
                      <p className="mb-0">{comment.body}</p>
                    </div>
                    {/* <div >
                  <p className="text-end mb-0">{comment.id}</p>
                </div> */}
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
