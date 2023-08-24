import React from "react";
import CardGroup from "./components/CardGroup";
import NavBar from "./components/NavBar";
import { Note } from "./model";
import "./App.css";

function App() {
  const note: Note = { id: 1, title: "title", description: "desc" };
  const [notes, setNotes] = React.useState<Note[]>([]);
  React.useEffect(() => {
    setNotes([note, note, note, note, note, note]);
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <CardGroup notes={notes}></CardGroup>
    </>
  );
}

export default App;
