/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getPostsFromLocalStorage, toCamelCase } from "../../common/common";
import { PostType, userType } from "../../interface/interface";
import useAppStore from "../../store/Appstore";
import Spinner from "../spinner/Spinner";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
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
import { TbSearch } from "react-icons/tb";

function AllPosts() {
  const [allPost, setAllPost] = useState<PostType[]>(
    getPostsFromLocalStorage()
  );
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>(allPost);
  const [currentPosts, setCurrentPosts] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [postsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<"Add" | "Update">("Add");
  const [initialValues, setInitialValues] = useState<PostType>({
    userId: "",
    title: "",
    body: "",
    id: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<PostType | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

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
    setAllPost(getPostsFromLocalStorage());
    setFilteredPosts(getPostsFromLocalStorage());
  }, [getAllPosts, getUsers]);

  useEffect(() => {
    const indexOfLastPost = (currentPage + 1) * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setCurrentPosts(filteredPosts.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, filteredPosts, postsPerPage]);

  const handleSearchValue = async (e: any) => {
    const inputValue: string = e.target.value.toLowerCase();
    setSearchValue(inputValue);
    setSearchLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (inputValue === "") {
      setFilteredPosts(getPostsFromLocalStorage());
    } else {
      const filterPost = allPost.filter((posts) => {
        return posts.title.toLowerCase().includes(inputValue);
      });
      setFilteredPosts(filterPost);
    }
    setCurrentPage(0);
    setSearchLoading(false);
  };

  const handleShowModal = (action: "Add" | "Update", post?: PostType) => {
    setModalAction(action);
    setInitialValues(
      post || { userId: "", title: "", body: "", id: Number("") }
    );
    setShowModal(true);
  };

  const handleShowDeleteModal = (post: PostType) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const handleDeletePost = async () => {
    if (postToDelete) {
      deletePost(Number(postToDelete.id));
      setAllPost(getPostsFromLocalStorage());
      setFilteredPosts(getPostsFromLocalStorage());
      setShowDeleteModal(false);
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
    setAllPost(getPostsFromLocalStorage());
    setFilteredPosts(getPostsFromLocalStorage());
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap align-items-center pt-2">
        <h1 className="px-3 w-25">Posts</h1>
        <div className="w-50">
          <InputGroup.Text className="bg-light px-1 py-0">
            <TbSearch className="fs-4" />
            <Form.Group className="w-100 border-0">
              <Form.Control
                type="text"
                value={searchValue}
                onChange={(e) => handleSearchValue(e)}
                placeholder="Search..."
                className="border-0 bg-light search-input"
              />
            </Form.Group>
          </InputGroup.Text>
        </div>
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
      {loading || searchLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner status={loading || searchLoading} />
        </div>
      ) : (
        <div className="py-2">
          {currentPosts.length === 0 ? (
            <div className="fs-5 text-center ">No posts match</div>
          ) : (
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
                      <div
                        className="text-center"
                        onClick={() => handleShowModal("Update", post)}
                      >
                        <FaRegEdit className="fs-5 text-color" />
                      </div>

                      <div className="text-center">
                        <Link to={`/comments?postId=${post.id}`}>
                          <FaComments className="fs-5 text-color" />
                        </Link>
                      </div>
                      <div
                        className="text-center text-color"
                        onClick={() => handleShowDeleteModal(post)}
                      >
                        <RiDeleteBin6Line className="fs-5 text-color" />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
          {filteredPosts.length > postsPerPage && (
            <nav className="d-flex justify-content-center">
              <ReactPaginate
                previousLabel={<MdSkipPrevious className="fs-6 text-white" />}
                nextLabel={<MdSkipNext className="fs-6 text-white" />}
                breakLabel="..."
                pageCount={Math.ceil(filteredPosts.length / postsPerPage)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={(data: { selected: number }) =>
                  setCurrentPage(data.selected)
                }
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
            handleClose={() => setShowModal(false)}
            handleAction={handleAction}
            initialValues={initialValues}
            users={users as userType[]}
            action={modalAction}
          />

          <DeleteModal
            show={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            handleDelete={handleDeletePost}
          />
        </div>
      )}
    </>
  );
}

export default AllPosts;
