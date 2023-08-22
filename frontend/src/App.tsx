import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Modal from "./components/Modal";
import ModalButton from "./components/ModalButton";
import Table from "./components/Table";
import React from "react";
import "./App.css";

function App() {
  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  const [loading, setLoading] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [alert, setAlert] = React.useState({
    message: "",
    show: false,
    type: "success",
  });

  // React.useEffect(() => {
  //   loadNotes(false);
  // });
  const loadNotes = (mainLoad = true) => {
    // main load will trigger loading screen and alert, used as false when after creating or deleting
    if (mainLoad) {
      setLoading(true);
    }
    fetch(
      "https://nkq7v0s6o2.execute-api.sa-east-1.amazonaws.com/default/web-notes-load"
    )
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.message);
        if (mainLoad) {
          setLoading(false);
          setAlert({ message: "Load", show: true, type: "success" });
        }
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setAlert({ message: err, show: true, type: "error" });
      });
  };
  const deleteNote = (id: number) => {
    setLoading(true);
    const param = id > 0 ? "?id=" + id : "";
    const url =
      "https://nkq7v0s6o2.execute-api.sa-east-1.amazonaws.com/default/web-notes-delete" +
      param;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        loadNotes(false);
        setAlert({ message: "Delete", show: true, type: "success" });
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setAlert({ message: err, show: true, type: "error" });
      });
  };
  const clearNotes = () => {
    setNotes([]);
  };
  const [textInput, setTextInput] = React.useState("");

  const createNote = () => {
    setLoading(true);
    fetch(
      "https://zcohs7rk32.execute-api.sa-east-1.amazonaws.com/test-stage/web-notes-create?text=" +
        textInput
    )
      .then((res) => res.json())
      .then((data) => {
        loadNotes(false);
        setLoading(false);
        setAlert({ message: "Create", show: true, type: "success" });
      })
      .catch((err) => {
        setLoading(false);
        setAlert({ message: err, show: true, type: "error" });
      });
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
          <div className="btn-group" role="group">
            <Button onClick={loadNotes} label="Load"></Button>
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
