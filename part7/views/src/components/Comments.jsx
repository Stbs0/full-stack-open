import { useState } from "react";
import blogServices from "../services/blogs";
import { useMutateCostume } from "../queries";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
const Comments = ({ blog }) => {
  const { commentMutation } = useMutateCostume();
const blogId = useParams().id
  const commentsData = useQuery({
    queryKey:["comments"],
    queryFn:blogServices.getComments
  })

  const comments = commentsData.data

  // FIXME: add this functionality
  // dont forget about the axios or services of blogs
  // also try add the fetching of comments throught the server and mutate the creation

  if (commentsData.isLoading) {
    return <div>fetchingcomments</div>
  }
  const handleClick = async (e) => {
    const inp = e.target.comment.value;
    const res = await blogServices.createComment(blog.id, inp);
  };

  return (
    <div>
      <h1>comments</h1>
      <input name='comment' /> <button>add comment</button>
      <ul>
        {comments.length
          ? comments.map((comment) => {
              return <li key={comment.id}>{comment.comment}</li>;
            })
          : null}
      </ul>
    </div>
  );
};
export default Comments;
