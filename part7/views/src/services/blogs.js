import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(baseUrl, config);
  const res = await request;
  console.log(token);
  return res.data;
};
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(token);

  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};
const update = async (newBlog, id) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.put(`${baseUrl}/${id}`, newBlog, config);

  return res.data;
};
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};
const getAllUsers = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.get("http://localhost:3001/api/users", config);
  return res.data;
};
const getComments = async (blogId, oldComment) => {
  const res = await axios.post(`${baseUrl}/${blogId}/comments`, oldComment);
  return res.data;
};

const createComment = async (blogId, newComment) => {
  const res = await axios.post(`${baseUrl}/${blogId}/comments`, newComment);

  return res.data
};
export default {
  getAll,
  remove,
  setToken,
  create,
  update,
  getAllUsers,
  getComments,
  createComment,
};
