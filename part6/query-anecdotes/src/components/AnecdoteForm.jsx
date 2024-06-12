import { createAnecdote } from "../requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NotificationContext from "../NotificationContext";
import { useContext } from "react";
const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [notification, dispatch] = useContext(NotificationContext);
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },onError:()=>{
         dispatch({
           type: "VALUE",
           payload: { content: "too short anecdote" },
         });
         setTimeout(() => {
           dispatch({ type: "CLEAR" });
         }, 3000);
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });

    dispatch({
      type: "VALUE",
      payload: { content: `you have create "${content}"` },
    });
    setTimeout(() => {
      dispatch({type:"CLEAR"});
    }, 3000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
