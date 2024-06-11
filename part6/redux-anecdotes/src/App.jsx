import AnecdoteForm from "./componants/AnecdoteForm";
import AnecdoteList from "./componants/AnecdoteList";
import Filter from "./componants/Filter";
import Notification from "./componants/Notification";
import { useEffect } from "react";
import anecServices from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();

  useEffect( () => {
     anecServices.getAll().then((res) => dispatch(setAnecdotes(res)));
  }, []);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
