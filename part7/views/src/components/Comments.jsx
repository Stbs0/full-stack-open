import blogServices from "../services/blogs";
import { useMutateCostume } from "../queries";
import { useQuery } from "@tanstack/react-query";
const Comments = ({ blogId }) => {
  const { commentMutation } = useMutateCostume();
  const commentsData = useQuery({
    queryKey: ["comments"],
    queryFn: () => {
      return blogServices.getComments(blogId);
    },
  });
  const comments = commentsData.data;

  if (commentsData.isLoading) {
    return <div>fetchingcomments</div>;
  }
  const handleClick = async (e) => {
    e.preventDefault();
    const newComment = e.target.comment.value;
    commentMutation.mutate({ blogId, newComment });
    e.target.comment.value = "";
  };

  return (
    <div>
      <h1>comments</h1>
      <form onSubmit={(e) => handleClick(e)}>
        <input name='comment' /> <button>add comment</button>
      </form>
      <ul>
        {comments.length
          ? comments.map((comment) => {
              return <li key={comment.id}>{comment.title}</li>;
            })
          : null}
      </ul>
    </div>
  );
};
export default Comments;
