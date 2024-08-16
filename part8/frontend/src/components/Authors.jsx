import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queires";
import { useQuery, useMutation } from "@apollo/client";
import { useOutletContext } from "react-router-dom";

const Authors = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const {notify} = useOutletContext();
  const { data, loading } = useQuery(ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.message);
      console.log(error.graphQLErrors);
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.log(messages);
      notify(messages);
    },
  });
  if (loading) {
    return <div>loading</div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const setBornTo = born;
    editAuthor({
      variables: {
        name,
        setBornTo,
      },
    });
    setBorn("");
    setName("");
  };
  const authors = data.allAuthors;
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthYear</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor='name'>
            name
            <select
              name='name'
             
              value={name}
              onChange={({target})=>setName(target.value)}
              id='name'>
              {authors.map((author) => {
                return <option key={author.name} value={author.name}>{author.name}</option>;
              })}
            </select>
          </label>{" "}
          <br />
          <label htmlFor='born'>born</label>
          <input
            onChange={({ target }) => setBorn(Number(target.value))}
            value={born}
            type='number'
            name='born'
          />{" "}
          <br />
          <button>update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
