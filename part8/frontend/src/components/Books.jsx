import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queires";
import { useState } from "react";

const Books = () => {
  const { data, loading, error } = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState("");

  if (loading) return <div>loading...</div>;
 if (error) {
   console.log({...error});

   return <div>{error.message}</div>;
 }
console.log("first")
  const books = data.allBooks;
  const uniqueGenres = [...new Set(books.flatMap((book) => book.genres))];

  return (
    <div>
      <h2>books</h2>
      <div>
        <button onClick={() => setGenre("")}>All Genres</button>
        {uniqueGenres.map((a) => (
          <button
            key={a}
            onClick={() => setGenre(a)}>
            {a}
          </button>
        ))}
      </div>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books
            .filter((book) => (genre ? book.genres.includes(genre) : true))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
