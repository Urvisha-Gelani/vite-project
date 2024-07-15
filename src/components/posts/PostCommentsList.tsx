import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CommentType } from "../../interface/interface";
import { Comment } from "react-loader-spinner";
import { apiUrl } from "../../common/common";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAppStore from "../../store/Appstore";
import Spinner from "../spinner/Spinner";

const PostCommentsList = () => {
  const { postId } = useParams();
  const { post, getPost, loading } = useAppStore();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPost(Number(postId));
    // fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await axios.get(`${apiUrl}/comments?postId=1`);
    setTimeout(() => {
      setComments([...comments, ...response.data]);
      setPage(page + 1);
    }, 1000);
  };

  return (
    <>
      {console.log(postId, "::::::::::")}
      
     
    </>
  );
};

export default PostCommentsList;
