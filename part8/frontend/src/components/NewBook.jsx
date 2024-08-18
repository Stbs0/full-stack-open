import { useState } from "react";
import { ADD_BOOK, ALL_BOOKS } from "../queires";
import { useMutation } from "@apollo/client";
import { useOutletContext } from "react-router-dom";

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  

  cache.updateQuery(query, (data ) => {
    if (!data) {
      return { data: [addedBook] };
    }
    return {
      allPersons: data.allBooks.concat(addedBook),
    };
  });
};

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const { notify } = useOutletContext();
  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      notify(messages);
      console.log({ ...error });
    },
    update: (cache, data) => {
      const addBook = data.data.addBook;
      updateCache(cache, { query: ALL_BOOKS }, addBook);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...");
    addBook({
      variables: {
        title,
        author,
        published,
        genres,
      },
    });
    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => {
              console.log(published);
              setPublished(Number(target.value));
            }}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button
            onClick={addGenre}
            type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  );
};

export default NewBook;
