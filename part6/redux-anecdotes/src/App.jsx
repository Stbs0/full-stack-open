import AnecdoteForm from "./componants/AnecdoteForm";
import AnecdoteList from "./componants/AnecdoteList";
import Filter from "./componants/Filter"
const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
<Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
