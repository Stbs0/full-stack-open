import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNameFilter] = useState([]);
  useEffect(() => {
    axios.get(" http://localhost:3001/persons").then((res)=>{
    console.log(res.data)
    setPersons(res.data)
    })
  },[]);
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
