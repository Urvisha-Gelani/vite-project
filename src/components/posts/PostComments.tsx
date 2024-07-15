import { useParams } from "react-router-dom";

function PostComments() {
    const {postId} = useParams();

  return <>
  {console.log(postId , "::::::::::::::::::::::::")}
  </>;
}

export default PostComments;
