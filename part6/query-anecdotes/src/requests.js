import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";
export const setAnecdotes = async () => (await axios.get(baseUrl)).data;

export const createAnecdote = async (content) =>
  (await axios.post(baseUrl, content)).data;
export const updateVotes = async ( content) =>
  (await axios.put(`${baseUrl}/${content.id}`, content)).data;
