import { createSlice } from "@reduxjs/toolkit";
import anecServices from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },

    incrementVote(state, action) {
      return state.map((anec) =>
        anec.id !== action.payload.id ? anec : action.payload,
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, incrementVote, setAnecdotes } =
  anecdoteSlice.actions;
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const res = await anecServices.getAll();

    dispatch(setAnecdotes(res));
  };
};
export const addAnecdote = (content) => {
  return async (dispatch) => {
    const res = await anecServices.create(content);
    dispatch(createAnecdote(res));
  };
};
export const addVoting = (id, content) => {
  return async (dispatch) => {
    const res = await anecServices.vote(id, content);
    dispatch(incrementVote(res));
  };
};
export default anecdoteSlice.reducer;
