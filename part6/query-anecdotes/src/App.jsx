import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { setAnecdotes, updateVotes } from "./requests";
import { useContext } from "react";

import NotificationContext from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const [ notification, dispatch ] = useContext(NotificationContext);
  const newVoteMutation = useMutation({
    mutationFn: updateVotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    newVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    const content = `you have voted "${anecdote.content}"`;
    dispatch({ type: "VALUE", payload: { content } });
    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 3000);
  };
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: setAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  });
  if (result.isPending) {
    return <div>is pending</div>;
  }
  if (result.isError) {
    return <span>Error: {result.error.message}</span>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
