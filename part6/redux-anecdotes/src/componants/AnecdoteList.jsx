import { incrementVote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") return anecdotes;
    return anecdotes.filter((anec) =>
      anec.content.toLowerCase().startsWith(filter),
    );
  });

  const dispatch = useDispatch();
  const increaseVote = (id,content) => {
    dispatch(incrementVote(id));
    dispatch(notify(`you have voted "${content}"`));
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
              <button onClick={() => increaseVote(anecdote.id,anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
