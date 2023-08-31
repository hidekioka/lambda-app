import { useState, useEffect } from "react";
import AccordionCardGroup from "./components/AccordionCardGroup";
import SimpleCardGroup from "./components/SimpleCardGroup";
import NotesModal from "./components/NotesModal";
import NavBar from "./components/NavBar";
import { Note } from "./model";
import "./App.css";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// const lambdaFunction: string = "/web-notes-";
const lambdaFunction: string = "/md-notes-";
const webnotesurl: string =
  "https://nymyofk0k9.execute-api.sa-east-1.amazonaws.com/default" +
  lambdaFunction;
// const webnotesurl: string =
//   " https://zcohs7rk32.execute-api.sa-east-1.amazonaws.com/default" +
//   lambdaFunction;
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
  const [selectedNote, setSelectedNote] = useState<Note>({
    id: 0,
    title: "",
    description: "",
  });
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
  const deleteNote = async (note: Note) => {
    setLoading(true);
    const param = note.id > 0 ? "?id=" + note.id : "";
    await fetch(webnotesurl + "delete" + param);
    await loadNotes();
    setAlert({ message: "Deleted", show: true, type: "success" });
    setLoading(false);
  };

  const createNote = async (note: Note) => {
    setLoading(true);
    await fetch(
      webnotesurl +
        "create?title=" +
        note.title +
        "&description=" +
        note.description
    );
    await loadNotes();
    setAlert({ message: "Created", show: true, type: "success" });
    setLoading(false);
  };

  const updateNote = async (note: Note) => {
    setLoading(true);
    await fetch(
      webnotesurl +
        "update?id=" +
        note.id +
        "&title=" +
        note.title +
        "&description=" +
        note.description
    );
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
          <NavBar>
            <Button
              variant="primary"
              onClick={() => {
                setSelectedNote({
                  id: 0,
                  title: "",
                  description: "",
                });
                setModal({
                  show: true,
                  title: "Create",
                });
              }}
            >
              Create Note
            </Button>
          </NavBar>
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
                title: modal.title,
              })
            }
            handleSave={() => {
              if (selectedNote.id <= 0) {
                createNote(selectedNote);
              } else {
                updateNote(selectedNote);
              }
            }}
          >
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  onChange={(event) =>
                    setSelectedNote({
                      id: selectedNote.id,
                      title: event.target.value,
                      description: selectedNote.description,
                    })
                  }
                >
                  {selectedNote.title}
                </Form.Control>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  onChange={(event) =>
                    setSelectedNote({
                      id: selectedNote.id,
                      title: selectedNote.title,
                      description: event.target.value,
                    })
                  }
                >
                  {selectedNote.description}
                </Form.Control>
              </Form.Group>
            </Form>
          </NotesModal>
          {/* <AccordionCardGroup notes={notes}></AccordionCardGroup> */}
          <SimpleCardGroup
            notes={notes}
            handleDelete={deleteNote}
            handleEdit={(note: Note) => {
              setModal({
                show: true,
                title: "Edit",
              });
              setSelectedNote(note);
            }}
          ></SimpleCardGroup>
        </>
      )}
    </>
  );
}

export default App;
