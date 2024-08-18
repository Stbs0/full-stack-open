import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_BOOKS, ME } from "../queires";
import { useOutletContext } from "react-router-dom";

const Recommidations = () => {
  const { data: me } = useOutletContext();
console.log(me)
  const { data, loading, error } = useQuery(ALL_BOOKS, {
    variables: { genre: me.me.favoriteGenre },

  });

  if (loading) return <div>loading</div>;
  if (error) {
    console.log({...error});

    return <div>error</div>;
  }
  const books = data.allBooks;
  return (
    <div>
      <p>book in your favorite genre </p>
      <table>
        <thead>
          <tr>
            <th>num</th>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, ind) => {
            return (
              <tr key={book.title}>
                {" "}
                <td>{ind}</td>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Recommidations;
