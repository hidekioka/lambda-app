import Alert from "./components/Alert";
import Button from "./components/NotesButton";
import NotesModal from "./components/NotesModal";
import NotesForm from "./components/NotesForm";
import Table from "./components/Table";
import { useState, useEffect } from "react";

import "./App.css";

const lambdaFunction: string = "/web-notes-";
// const webnotesurl: string =
//   " https://nkq7v0s6o2.execute-api.sa-east-1.amazonaws.com/test-stage" +
//   lambdaFunction;
const webnotesurl: string =
  "https://zcohs7rk32.execute-api.sa-east-1.amazonaws.com/test-stage" +
  lambdaFunction;
// const awsRequestHeader = {
//   "X-Amz-Date": "20230825T193850Z",
//   Accept: "*/*",
//   Authorization:
//     "AWS4-HMAC-SHA256 Credential=AKIA5T7VRFX75DFGFHPO/20230825/sa-east-1/execute-api/aws4_request, SignedHeaders=host;x-amz-date, Signature=05fb457da218436df03f463878b770cf372d42b617ea93d0fd2a162653106144",
// };

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
    let response: Response = await fetch(webnotesurl + "load", {
      method: "GET",
    });
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

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <Alert show={alert.show}>
            {alert.type === "success" ? "Success" : "Error"}: {alert.message}
          </Alert>
          <NotesModal
            show={showModal}
            title="Create"
            close={handleCloseModal}
            save={() => {
              createNote(textInput);
              setTextInput("");
            }}
          >
            <NotesForm
              label="Text"
              textInput={textInput}
              handleTextChange={(event: React.ChangeEvent<any>) => {
                setTextInput(event.target.value);
              }}
            ></NotesForm>
          </NotesModal>
          <div className="btn-group web-notes-crud-btn-group" role="group">
            <Button
              onClick={loadNotesWithLoadingAndAlert}
              label="Load"
            ></Button>
            <Button onClick={clearNotes} label="Clear"></Button>
            <Button
              onClick={() => {
                deleteNote(-1);
              }}
              label="Delete All"
            ></Button>
            <Button onClick={handleShowModal} label="Create New"></Button>
          </div>
          <div className="list-content">
            <Table
              notes={notes}
              heading="Notes"
              deleteFunction={deleteNote}
              updateFunction={updateNote}
            />
          </div>
        </>
      )}
    </>
  );
}

export default App;
