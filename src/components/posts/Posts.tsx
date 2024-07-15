/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useAppStore from "../../store/Appstore";
import Spinner from "../spinner/Spinner";
import { PostType } from "../../interface/interface";
import { Button, Card } from "react-bootstrap";
import { apiUrl, toCamelCase } from "../../common/common";
import ReactPaginate from "react-paginate";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { Link } from "react-router-dom";

function Posts() {
  const { posts, getPosts, loading } = useAppStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(10);
  const postUrl = `${apiUrl}/posts`;
  useEffect(() => {
    getPosts(postUrl);
  }, [getPosts, postUrl]);

  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = (posts as PostType[])?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const handlePageClick = (data: any) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner status={loading} />
        </div>
      ) : (
        <div className="py-2">
          <h1 className="px-3">Posts</h1>
          <div className="d-flex flex-wrap align-item-center justify-content-center gap-4 ">
            {currentPosts.map((post: PostType) => {
              return (
                <Card
                  style={{ width: "20rem" }}
                  className="mb-3 box-shadow border card-bg"
                  key={post.id}
                >
                  <Card.Body>
                    <Card.Title>{toCamelCase(post.title)}</Card.Title>
                    <Card.Text>
                      {post.body.length > 100
                        ? `${post.body.slice(0, 100)}...`
                        : post.body}
                    </Card.Text>
                    <Card.Text className="text-center">
                      <Link to={`/comments?postId=${post.id}`}>
                        <Button
                          variant="primary"
                          className="btn-bg-color border-0"
                        >
                          Comments
                        </Button>
                      </Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
          {(posts as PostType[]).length > 10 ? (
            <nav className="d-flex justify-content-center">
              <ReactPaginate
                previousLabel={<MdSkipPrevious className="fs-6 text-white" />}
                nextLabel={<MdSkipNext className="fs-6 text-white" />}
                breakLabel={"..."}
                pageCount={Math.ceil(
                  (posts as PostType[]).length / postsPerPage
                )}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                activeLinkClassName={"text-white pagination-bg"}
                previousClassName={"px-3 py-1 mx-1 bg-primary"}
                nextClassName={"px-3 py-1 mx-1 bg-primary"}
                breakClassName={"px-3 py-1 mx-1"}
                pageLinkClassName={
                  "mx-1 d-flex align-item-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105 text-decoration-none"
                }
              />
            </nav>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Posts;
