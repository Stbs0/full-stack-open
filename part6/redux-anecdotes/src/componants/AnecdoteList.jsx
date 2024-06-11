import { incrementVote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../reducers/notificationReducer";
import anecServices from "../services/anecdotes";
const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") return anecdotes;
    return anecdotes.filter(({ content }) =>
      content.toLowerCase().startsWith(filter),
    );
  });

  const dispatch = useDispatch();
  const increaseVote = async (id, content) => {
    const res = await anecServices.vote(id, {...content});
    dispatch(incrementVote(res));
    dispatch(notify(`you have voted "${content.content}"`));
  };
  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => increaseVote(anecdote.id, anecdote)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
