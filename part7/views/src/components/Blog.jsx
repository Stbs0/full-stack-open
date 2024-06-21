import { useParams } from "react-router-dom";
import { useState } from "react";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../NotificationContext";
import { createSuccessMsg, createErrorMsg } from "../actions";
import { useMutation, useQueryClient,useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUserValue } from "../UserContext";
import { useMutateCostume } from "../queries";
import Comments from "./Comments";
const Blog = ({blog}) => {
  const { voteMutation, deleteMutation } = useMutateCostume();
  const navigate = useNavigate();

  const notificationDispatcher = useNotificationDispatch();
  const id = useParams().id;
  const user = useUserValue();
 

 
  console.log(blog);
  const handleUpdateBlog = async (updatedBlog) => {
    console.log(updatedBlog.id);
    voteMutation.mutate({ updatedBlog, id: updatedBlog.id });
  };
  const handleDeleteBlog = (id, title) => {
    if (window.confirm(`remove blog "${title}"`)) {
      deleteMutation.mutate(id);
      navigate(`/users/${blog.user.id}`);
      notificationDispatcher(createSuccessMsg(`you have deleted '${title}' `));
    }
  };


  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes{" "}
        <button
          onClick={() =>
            handleUpdateBlog({ ...blog, likes: String(+blog.likes + 1) })
          }>
          like
        </button>
      </p>
      <p>
        added by {blog.user.name}{" "}
        {user.username === blog.user.username ? (
          <button onClick={() => handleDeleteBlog(blog.id, blog.title)}>
            delete
          </button>
        ) : null}
      </p>
      <Comments
        
        blog={blog}
      />
    </div>
  );
};
export default Blog;
