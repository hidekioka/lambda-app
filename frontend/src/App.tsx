// import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Modal from "./components/Modal";
import ModalButton from "./components/ModalButton";
import Table from "./components/Table";
import React from "react";

import "./App.css";

const webnotesurl: string =
  "https://nkq7v0s6o2.execute-api.sa-east-1.amazonaws.com/default";

function App() {
  // const handleSelectItem = (item: string) => {
  //   console.log(item);
  // };
  const [loading, setLoading] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [textInput, setTextInput] = React.useState("");
  // const [note, setNote] = React.useState({ id: 0, text: "0" });
  const [alert, setAlert] = React.useState({
    message: "",
    show: false,
    type: "success",
  });

  React.useEffect(() => {
    loadNotesWithLoadingAndAlert();
  }, []);
  const loadNotesWithLoadingAndAlert = () => {
    setLoading(true);
    loadNotes();
    setAlert({ message: "Loaded", show: true, type: "success" });
    setLoading(false);
  };
  const clearNotes = () => {
    setNotes([]);
  };
  const loadNotes = async () => {
    let response: Response = await fetch(webnotesurl + "/web-notes-load");
    const data = await response.json();
    setNotes(data.message);
  };
  const deleteNote = async (id: number) => {
    setLoading(true);
    const param = id > 0 ? "?id=" + id : "";
    await fetch(webnotesurl + "/web-notes-delete" + param);
    loadNotes();
    setAlert({ message: "Deleted", show: true, type: "success" });
    setLoading(false);
  };

  const createNote = async () => {
    setLoading(true);
    await fetch(webnotesurl + "/web-notes-create?text=" + textInput);
    loadNotes();
    setAlert({ message: "Created", show: true, type: "success" });
    setLoading(false);
  };

  const updateNote = async () => {
    setLoading(true);
    await fetch(webnotesurl + "/web-notes-update");
    loadNotes();
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
          <Modal
            setTextInput={setTextInput}
            textInput={textInput}
            createNote={createNote}
            modalId="createNew"
          ></Modal>
          <Modal
            setTextInput={setTextInput}
            textInput={textInput}
            createNote={createNote}
            modalId="edit"
          ></Modal>
          <div className="btn-group" role="group">
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
            <ModalButton modalId="createNew" label="Create New"></ModalButton>
          </div>
          <div className="list-content">
            {/* <ListGroup
              notes={notes}
              heading="==List=="
              onSelectItem={handleSelectItem}
            /> */}
            <Table notes={notes} heading="Notes" deleteNote={deleteNote} />
          </div>
        </>
      )}
    </>
  );
}

export default App;
