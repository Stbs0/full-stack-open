import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNameFilter] = useState([]);

  const handleOnChangeName = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };
  const handleOnChangeNumber = (e) => {
    console.log(e.target.value);
    setNewNumber(e.target.value);
  };
  const handleOnChangeFilter = (e) => {
    const value = e.target.value;
    console.log(value);
    const ff = persons.filter((person) => {
      console.log(person.name.toLowerCase().startsWith(value.toLowerCase()));
      return person.name.toLowerCase().startsWith(value.toLowerCase());
    });
    console.log(ff);
    setNameFilter(ff);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    for (const person of persons) {
      if (person.name === newPerson.name) {
        alert(`${newPerson.name} is already added to phonebook`);
        return;
      }
    }
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleOnChangeFilter={handleOnChangeFilter} filter={filter} />
      <h1>add a new</h1>
      <PersonForm
        handleOnChangeName={handleOnChangeName}
        handleOnChangeNumber={handleOnChangeNumber}
        newName={newName}
        newNumber={newNumber}
        handleOnSubmit={handleOnSubmit}
      />
      <h2>Numbers</h2>
     <Persons persons={persons} />
    </div>
  );
};

export default App;
