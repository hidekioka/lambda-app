import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Form from "./components/Form";
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

  const loadNotes = () => {
    setLoading(true);
    fetch(
      "https://zcohs7rk32.execute-api.sa-east-1.amazonaws.com/test-stage/web-notes-load"
    )
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.message);
        setLoading(false);
        setShowSucessAlert(true);
        setShowErrorAlert(false);
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
      "https://zcohs7rk32.execute-api.sa-east-1.amazonaws.com/test-stage/web-notes-delete"
    )
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.message);
        setLoading(false);
        setShowSucessAlert(true);
        setShowErrorAlert(false);
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
  // useEffect(loadNotes, []);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <Alert show={showSucessAlert}>List loaded</Alert>
          <Alert show={showErrorAlert}>Error: {errorMessage} </Alert>
          <div className="btn-group" role="group">
            <Button
              onClick={() => {
                loadNotes();
              }}
              label="Load"
            ></Button>
            <Button onClick={clearNotes} label="Create New"></Button>
            <Button onClick={clearNotes} label="Clear"></Button>
            <Button onClick={deleteNotes} label="Delete"></Button>
          </div>
          <div>
            <Form></Form>
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
