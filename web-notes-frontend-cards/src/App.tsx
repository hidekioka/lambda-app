import { useState, useEffect } from "react";
import AccordionCardGroup from "./components/AccordionCardGroup";
import SimpleCardGroup from "./components/SimpleCardGroup";
import NotesModal from "./components/NotesModal";
import NavBar from "./components/NavBar";
import { Note } from "./model";
import "./App.css";
import Alert from "react-bootstrap/Alert";

// const lambdaFunction: string = "/web-notes-";
const lambdaFunction: string = "/md-note-";
// const webnotesurl: string =
//   "https://nymyofk0k9.execute-api.sa-east-1.amazonaws.com/default" +
//   lambdaFunction;
const webnotesurl: string =
  " https://zcohs7rk32.execute-api.sa-east-1.amazonaws.com/default" +
  lambdaFunction;
// const webnotesurl: string =
//   "https://nkq7v0s6o2.execute-api.sa-east-1.amazonaws.com/default" +
//   lambdaFunction;

export interface AlertProp {
  show: boolean;
  type: "success" | "danger" | "warning";
  message: string;
}

export interface ModalProp {
  show: boolean;
  title: string;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [alert, setAlert] = useState<AlertProp>({
    show: false,
    type: "success",
    message: "",
  });
  const [modal, setModal] = useState<ModalProp>({
    show: false,
    title: "Create new",
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
    try {
      await loadNotes();
      // correct load doesn't need to show a message
      // setAlert({ message: "Loaded", show: true, type: "success" });
    } catch (e) {
      setAlert({ message: "[Error] " + e, show: true, type: "danger" });
    }
    setLoading(false);
  };
  const loadNotes = async () => {
    let response: Response = await fetch(webnotesurl + "load");
    if (!response.ok) {
      throw response.statusText;
    }
    const data = await response.json();
    setNotes(JSON.parse(data.message));
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
          <Alert
            variant={alert.type}
            show={alert.show}
            onClose={() => {
              setAlert({
                show: false,
                type: "success",
                message: "",
              });
            }}
            dismissible
          >
            {alert.message}
          </Alert>
          <NotesModal
            show={modal.show}
            title={modal.title}
            handleClose={() =>
              setModal({
                show: false,
                title: "Create new",
              })
            }
          >
            OOF
          </NotesModal>
          <NavBar></NavBar>
          {/* <AccordionCardGroup notes={notes}></AccordionCardGroup> */}
          <SimpleCardGroup notes={notes}></SimpleCardGroup>
        </>
      )}
    </>
  );
}

export default App;
