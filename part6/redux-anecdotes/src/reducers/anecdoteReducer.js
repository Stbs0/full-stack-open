import { createSlice } from "@reduxjs/toolkit";
import anecServices from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    async createAnecdote(state, action) {
      // TODO use it through redux Thunk library
      const res = await anecServices.create(action.payload);
      console.log(action.payload);
      console.log(res)
      state.push(res);
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
export default anecdoteSlice.reducer;
