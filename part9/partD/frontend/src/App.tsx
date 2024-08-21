import { useState } from "react";

interface Note {
  id: string;
  content: string;
}

const App = () => {
  const [newNote, setNewNote] = useState("");
const [notes, setNotes] = useState<Note[]>([]);
  return null;
};
