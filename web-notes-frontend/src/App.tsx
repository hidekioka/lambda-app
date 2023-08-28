import Alert from "./components/Alert";
import Button from "./components/NotesButton";
import NotesModal from "./components/NotesModal";
import NotesForm from "./components/NotesForm";
import Table from "./components/Table";
import { useState, useEffect } from "react";

import "./App.css";

// const lambdaFunction: string = "/java-container-";
const lambdaFunction: string = "/web-notes-";

// REST API GATEWAY IN AWS
const webnotesurl: string =
  " https://nkq7v0s6o2.execute-api.sa-east-1.amazonaws.com/default" +
  lambdaFunction;

// HTTP API GATEWAY IN AWS
// const webnotesurl: string =
//   "https://zcohs7rk32.execute-api.sa-east-1.amazonaws.com/test-stage" +
//   lambdaFunction;
const awsRequestHeader: HeadersInit = new Headers();
const awsAuth: string =
  "AWS4-HMAC-SHA256 Credential=AKIA5T7VRFX75DFGFHPO/20230828/sa-east-1/execute-api/aws4_request, SignedHeaders=host;x-amz-date, Signature=39cc69d88a67c45a882517cb68c0913c3c72265f9978ca8d64602b7e0b24b779";

// awsRequestHeader.set("X-Amz-Date", "20230828T132439Z");
// awsRequestHeader.set("Authorization", awsAuth);
// awsRequestHeader.set("Host", "zcohs7rk32.execute-api.sa-east-1.amazonaws.com");
// awsRequestHeader.set("Accept-Encoding", "gzip, deflate, br");

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
    // is being called twice because StrictMode do double call to search for problems (just in dev, not in prod)
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
      method: "OPTIONS",
      headers: awsRequestHeader,
    });
    const data = await response.json();
    setNotes(data.message);
  };
  const deleteNote = async (id: number) => {
    setLoading(true);
    try {
      const param = id > 0 ? "?id=" + id : "";
      const response = await fetch(webnotesurl + "delete" + param, {
        method: "GET",
        headers: awsRequestHeader,
      });
      if (response.ok) {
        await loadNotes();
        setAlert({ message: "Deleted", show: true, type: "success" });
      } else {
        throw response.statusText;
      }
    } catch (e) {
      setAlert({ message: "Deleted", show: true, type: "error" });
    } finally {
      setLoading(false);
    }
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
          <Alert show={alert.show} type={alert.type}>
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
