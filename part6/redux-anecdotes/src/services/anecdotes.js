import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";
const getAll = async () => {
  const res = await axios.get(baseUrl);
  console.log(res.data);
  return res.data;
};
const create = async (content) => {
  const newAnecdote = { content, votes: 0 };

  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};
const vote = async (id, content) => {
  const res = await axios.put(`${baseUrl}/${id}`, {
    ...content,
    votes: content.votes + 1,
  });
  return res.data;
};
export default { getAll, create, vote };
