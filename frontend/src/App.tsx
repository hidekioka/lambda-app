import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Form from "./components/Form";
import Modal from "./components/Modal";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [showSucessAlert, setShowSucessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");
  const [successMessage, setSuccessMessage] = useState("");

  const loadNotes = () => {
    setLoading(true);
    fetch(
      "https://nkq7v0s6o2.execute-api.sa-east-1.amazonaws.com/default/web-notes-load"
    )
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.message);
        setLoading(false);
        setShowSucessAlert(true);
        setShowErrorAlert(false);
        setSuccessMessage("Load");
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setShowErrorAlert(false);
        setErrorMessage(err.message);
      });
  };
  const deleteNotes = () => {
    setLoading(true);
    fetch(
      "https://nkq7v0s6o2.execute-api.sa-east-1.amazonaws.com/default/web-notes-delete"
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setShowSucessAlert(true);
        setShowErrorAlert(false);
        loadNotes();
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setShowErrorAlert(false);
        setErrorMessage(err.message);
      });
  };
  const clearNotes = () => {
    setNotes([]);
    setShowSucessAlert(false);
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <Modal></Modal>
          <Alert show={showSucessAlert}>Success: {successMessage}</Alert>
          <Alert show={showErrorAlert}>Error: {errorMessage} </Alert>
          <div className="btn-group" role="group">
            <Button
              onClick={() => {
                loadNotes();
              }}
              label="Load"
            ></Button>
            <Button onClick={clearNotes} label="Clear"></Button>
            <Button onClick={deleteNotes} label="Delete"></Button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Create New
            </button>
          </div>
          <div>
            <ListGroup
              notes={notes}
              heading="==List=="
              onSelectItem={handleSelectItem}
            />
          </div>
        </>
      )}
    </>
  );
}

export default App;
