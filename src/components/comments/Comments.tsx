import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CommentType } from "../../interface/interface";
import { Comment } from "react-loader-spinner";
import { apiUrl } from "../../common/common";
import axios from "axios";

const CommentsList = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await axios.get(
      `${apiUrl}/comments?_page=${page}&_limit=10`
    );
    setTimeout(() => {
      setComments([...comments, ...response.data]);
      setPage(page + 1);
    }, 1000);
  };

  return (
    <div>
      <h1>Comments</h1>
      <div className="d-flex">
        <InfiniteScroll
          dataLength={comments.length}
          next={fetchComments}
          hasMore={true}
          loader={
            <Comment
              visible={true}
              height="50"
              width="80"
              ariaLabel="comment-loading"
              wrapperStyle={{}}
              wrapperClass="comment-wrapper text-center"
              color="#fff"
              backgroundColor="#2E236C"
            />
          }
          endMessage={<p>No more comments to load.</p>}
        >
          <div className="w-100 d-flex flex-wrap justify-content-center gap-4">
            {comments.map((comment) => (
              <div className="w-500px px-2 py-3 border">
                <div className="d-flex justify-centent-between align-item-center">
                  <div className="w-20 text-center">
                    <span className="comment-icon">
                      {comment.name.slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                  <div className="w-80 text-left">
                    <p>{comment.email}</p>
                  </div>
                </div>
                <div className="px-2">
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
  );
};

export default CommentsList;
