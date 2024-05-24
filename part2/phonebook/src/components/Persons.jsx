/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const Persons = ({ persons }) => (
  <ul>
    {persons.map((person) => (
      <li key={person.id}>
        {person.name} {person.number}
      </li>
    ))}
  </ul>
);
export default Persons
