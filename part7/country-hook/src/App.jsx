import { useCountry } from "./hooks";



const Country = ({ name,capital,population,flags }) => {
  if (!name) {
    return null;
  }

  if (!name?.common) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{name.common} </h3>
      <div>capital {capital[0]} </div>
      <div>population {population}</div>
      <img
        src={flags.png}
        height='100'
        alt={`flag of ${name.common}`}
      />
    </div>
  );
};

const App = () => {
  

  const { country, setValue, value } = useCountry();
  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>find</button>
      </form>

      <Country {...country} />
    </div>
  );
};

export default App;
