import AnecdoteForm from "./componants/AnecdoteForm";
import AnecdoteList from "./componants/AnecdoteList";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
