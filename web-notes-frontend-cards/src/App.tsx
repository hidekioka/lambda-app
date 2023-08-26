import { useState, useEffect } from "react";
import CardGroup from "./components/CardGroup";
import NavBar from "./components/NavBar";
import { Note } from "./model";
import "./App.css";

// const lambdaFunction: string = "/web-notes-";
const lambdaFunction: string = "/md-note-";
const webnotesurl: string =
  "https://zcohs7rk32.execute-api.sa-east-1.amazonaws.com/test-stage" +
  lambdaFunction;
// const webnotesurl: string =
//   "https://nkq7v0s6o2.execute-api.sa-east-1.amazonaws.com/default" +
//   lambdaFunction;

  

function App() {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [alert, setAlert] = useState({
    message: "",
    show: false,
    type: "success",
  });

  // Create Modal variables
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Create Form variables
  const [textInput, setTextInput] = useState("");

  // First load
  useEffect(() => {
    loadNotesWithLoadingAndAlert();
  }, []);

  // Clearing function
  const clearNotes = () => {
    setNotes([]);
  };
  // Calls to the backend
  const loadNotesWithLoadingAndAlert = async () => {
    setLoading(true);
    await loadNotes();
    setAlert({ message: "Loaded", show: true, type: "success" });
    setLoading(false);
  };
  const loadNotes = async () => {
    let response: Response = await fetch(webnotesurl + "load");
    const data = await response.json();
    setNotes(data.message);
  };
  const deleteNote = async (id: number) => {
    setLoading(true);
    const param = id > 0 ? "?id=" + id : "";
    await fetch(webnotesurl + "delete" + param);
    await loadNotes();
    setAlert({ message: "Deleted", show: true, type: "success" });
    setLoading(false);
  };

  const createNote = async (text: string) => {
    setLoading(true);
    await fetch(webnotesurl + "create?text=" + text);
    await loadNotes();
    setAlert({ message: "Created", show: true, type: "success" });
    setLoading(false);
  };

  const updateNote = async (id: number, text: string) => {
    setLoading(true);
    await fetch(webnotesurl + "update?id=" + id + "&text=" + text);
    await loadNotes();
    setAlert({ message: "Updated", show: true, type: "success" });
    setLoading(false);
  };

  // const note: Note = { id: 1, title: "title", description: "desc" };
  // const [notes, setNotes] = useState<Note[]>([]);
  // useEffect(() => {
  //   setNotes([note, note, note, note, note, note]);
  // }, []);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <NavBar></NavBar>
          <CardGroup notes={notes}></CardGroup>
        </>
      )}
    </>
  );
}

export default App;
