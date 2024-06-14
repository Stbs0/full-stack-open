import { useState } from "react";
import storage from "../services/storage";
import { useDispatch } from "react-redux";
import { addLike, removeBlog } from "../reducers/blogsReducer";
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const nameOfUser = blog.user ? blog.user.name : "anonymous";

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const canRemove = blog.user ? blog.user.username === storage.me() : true;

  return (
    <div
      style={style}
      className='blog'>
      {blog.title} by {blog.author}
      <button
        style={{ marginLeft: 3 }}
        onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      {visible && (
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            likes {blog.likes}
            <button
              style={{ marginLeft: 3 }}
              onClick={() =>
                dispatch(addLike({ ...blog, likes: blog.likes + 1 }))
              }>
              like
            </button>
          </div>
          <div>{nameOfUser}</div>
          {canRemove && (
            <button onClick={() => dispatch(removeBlog(blog))}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
