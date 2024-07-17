/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useAppStore, { loadPostsFromLocalStorage } from "../../store/Appstore";
import Spinner from "../spinner/Spinner";
import { PostType, userType } from "../../interface/interface";
import { Button, Card, Modal, Form } from "react-bootstrap";
import { apiUrl, toCamelCase } from "../../common/common";
import ReactPaginate from "react-paginate";
import {
  MdOutlineAddComment,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { postSchema } from "../../validation/FormError";

function Posts() {
  const { userId } = useParams();
  const { posts, getPosts, loading, getUser, user, createPost, getUsers, users } = useAppStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  if(localStorage.getItem("posts")) {
    
    console.log(JSON.parse(localStorage.getItem("posts")),"**********posttttttttt*******");
  }else {
    console.log("********************")
  }
  // console.log(loadPostsFromLocalStorage() , "***loadPostsFromLocalStorage");

  const postUrl = userId
    ? `${apiUrl}/users/${userId}/posts`
    : `${apiUrl}/posts`;

  useEffect(() => {
    if (userId) {
      getUser(Number(userId));
    } else {
      getUsers();
    }
    getPosts(postUrl);
  }, [getPosts, postUrl, getUser, userId, getUsers]);

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

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const formik = useFormik<PostType>({
    initialValues: {
      userId: userId ? Number(userId) : Number(""),
      title: "",
      body: "",
      id: Number(""),
    },
    validationSchema: postSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values , "********values");
      try {
        await createPost(postUrl, values);
        resetForm();
        setShowModal(false);
      } catch (error) {
        console.error("Error creating post:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner status={loading} />
        </div>
      ) : (
        <div className="py-2">
          {userId ? (
            <div>
              <p className="mb-0 fs-1 text-center">{toCamelCase(user.name)}</p>
            </div>
          ) : null}
          <div className="d-flex justify-content-between flex-wrap align-items-center">
            <h1 className="px-3 w-75">Posts</h1>
            <div className="w-25 text-end px-4">
              <Button
                variant="primary"
                className="btn-bg-color border-0 px-4"
                onClick={handleShowModal}
              >
                Post <MdOutlineAddComment className="fs-4" />
              </Button>
            </div>
          </div>
          <div className="d-flex flex-wrap align-item-center justify-content-center gap-4 mt-3">
            {currentPosts.map((post: PostType) => (
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
            ))}
          </div>
          {(posts as PostType[]).length > 10 && (
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
          )}

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Create New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={formik.handleSubmit}>
                {!userId && (
                  <Form.Group className="mb-3" controlId="formPostUserId">
                    <Form.Label>User</Form.Label>
                    <Form.Control
                      as="select"
                      name="userId"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.userId}
                      isInvalid={formik.touched.userId && formik.errors.userId}
                    >
                      <option value="">Select user</option>
                      {(users as userType[]).map((user :userType) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.userId}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
                <Form.Group className="mb-3" controlId="formPostTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    isInvalid={formik.touched.title && formik.errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPostBody">
                  <Form.Label>Body</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="body"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.body}
                    isInvalid={formik.touched.body && formik.errors.body}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.body}
                  </Form.Control.Feedback>
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                   Post
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}

export default Posts;
