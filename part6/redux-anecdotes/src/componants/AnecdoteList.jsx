import { addVoting } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") return anecdotes;
    return anecdotes.filter(({ content }) =>
      content.toLowerCase().startsWith(filter),
    );
  });

  const increaseVote = (id, content) => {
    dispatch(addVoting(id, content));
    dispatch(setNotification(`you have voted "${content.content}"`,1000));
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
              <button onClick={() => increaseVote(anecdote.id, anecdote)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
