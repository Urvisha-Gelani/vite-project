import { useEffect, useState } from "react";
import { loadPostsFromLocalStorage, toCamelCase } from "../../common/common";
import { PostType, userType } from "../../interface/interface";
import useAppStore from "../../store/Appstore";
import Spinner from "../spinner/Spinner";
import { Button, Card } from "react-bootstrap";
import {
  MdOutlineAddComment,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import ReactPaginate from "react-paginate";
import CustomModal from "../../modal/CustomModal";
import DeleteModal from "../../modal/DeleteModal";
import { Link } from "react-router-dom";
import { FaComments, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function AllPosts() {
  const [allPost, setAllPost] = useState<PostType[]>(
    loadPostsFromLocalStorage()
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<"Add" | "Update">("Add");
  const [initialValues, setInitialValues] = useState<PostType>({
    userId: 0,
    title: "",
    body: "",
    id: Number(""),
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<PostType | null>(null);

  const {
    getAllPosts,
    loading,
    createPost,
    getUsers,
    users,
    updatePost,
    deletePost,
  } = useAppStore();

  useEffect(() => {
    getAllPosts();
    getUsers();
    setAllPost(loadPostsFromLocalStorage());
  }, [getAllPosts, getUsers]);

  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPost.slice(indexOfFirstPost, indexOfLastPost);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

  const handleShowModal = (action: "Add" | "Update", post?: PostType) => {
    setModalAction(action);
    setInitialValues(
      post || { userId: 0, title: "", body: "", id: Number("") }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleShowDeleteModal = (post: PostType) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDeletePost = async () => {
    if (postToDelete) {
      await deletePost(postToDelete.id);
      setAllPost(loadPostsFromLocalStorage());
      handleCloseDeleteModal();
    }
  };

  const handleAction = async (values: PostType) => {
    const data = {
      userId: Number(values.userId),
      id: Number(values.id),
      title: values.title,
      body: values.body,
    };
    if (modalAction === "Add") {
      await createPost(data);
    } else {
      await updatePost(data);
    }
    setAllPost(loadPostsFromLocalStorage());
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner status={loading} />
        </div>
      ) : (
        <div className="py-2">
          <div className="d-flex justify-content-between flex-wrap align-items-center">
            <h1 className="px-3 w-75">Posts</h1>
            <div className="w-25 text-end px-4">
              <Button
                variant="primary"
                className="btn-bg-color border-0 px-4"
                onClick={() => handleShowModal("Add")}
              >
                Post <MdOutlineAddComment className="fs-4" />
              </Button>
            </div>
          </div>
          <div className="d-flex flex-wrap align-item-center justify-content-center gap-4 mt-3">
            {currentPosts.map((post) => (
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
                  <div className="d-flex justify-content-center gap-3 mt-3">
                    <Card.Text className="text-center">
                      <div onClick={() => handleShowModal("Update", post)}>
                        <FaRegEdit className="fs-5 text-color" />
                      </div>
                    </Card.Text>

                    <Card.Text className="text-center">
                      <Link to={`/comments?postId=${post.id}`}>
                        <div>
                          <FaComments className="fs-5 text-color" />
                        </div>
                      </Link>
                    </Card.Text>
                    <Card.Text className="text-center text-color">
                      <div onClick={() => handleShowDeleteModal(post)}>
                        <RiDeleteBin6Line className="fs-5 text-color" />
                      </div>
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
          {allPost.length > postsPerPage && (
            <nav className="d-flex justify-content-center">
              <ReactPaginate
                previousLabel={<MdSkipPrevious className="fs-6 text-white" />}
                nextLabel={<MdSkipNext className="fs-6 text-white" />}
                breakLabel="..."
                pageCount={Math.ceil(allPost.length / postsPerPage)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                activeClassName="active"
                activeLinkClassName="text-white pagination-bg"
                previousClassName="px-3 py-1 mx-1 bg-primary"
                nextClassName="px-3 py-1 mx-1 bg-primary"
                breakClassName="px-3 py-1 mx-1"
                pageLinkClassName="mx-1 d-flex align-item-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105 text-decoration-none"
              />
            </nav>
          )}

          <CustomModal
            showModal={showModal}
            handleClose={handleCloseModal}
            handleAction={handleAction}
            initialValues={initialValues}
            users={users as userType[]}
            action={modalAction}
          />

          <DeleteModal
            show={showDeleteModal}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDeletePost}
          />
        </div>
      )}
    </>
  );
}

export default AllPosts;
