import { useParams } from "react-router-dom";
import { useState } from "react";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../NotificationContext";
import { createSuccessMsg, createErrorMsg } from "../actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMutateCostume = () => {
  const queryClient = useQueryClient();
  const notificationDispatcher = useNotificationDispatch();

  const voteMutation = useMutation({
    mutationFn: ({ updatedBlog, id }) => {
      console.log(id, updatedBlog);
      return blogService.update(updatedBlog, id);
    },
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
      );
      notificationDispatcher(
        createSuccessMsg(`you have voted '${updatedBlog.title}' `),
      );
    },
    onError: (error) => {
      console.log(error);
      notificationDispatcher(createErrorMsg(`vote failed`));
    },
    onSettled: () => {
      setTimeout(() => {
        notificationDispatcher({ type: "CLEAR" });
      }, 5000);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
      console.log(error);
      notificationDispatcher(createErrorMsg(`vote failed`));
    },
    onSettled: () => {
      setTimeout(() => {
        notificationDispatcher({ type: "CLEAR" });
      }, 5000);
    },
  });

  return { voteMutation, deleteMutation };
};
export const useGetUsers = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: blogService.getAllUsers,
  });
  return [isLoading, data];
};
export const useGetBlogs = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
  console.log(data);
  return [isLoading, data];
};
