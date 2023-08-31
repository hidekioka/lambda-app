import Alert from "./Alert.js";
import Button from "./NotesButton.js";
import NotesModal from "./NotesModal.js";
import NotesForm from "./NotesForm.js";
import Table from "./Table.js";
import { useState, useEffect } from "react";
import { properties } from "../assets/properties.js";
import secureLocalStorage from "react-secure-storage";

function NoteCrud() {
  let awsRequestHeader: HeadersInit = {
    Authorization: secureLocalStorage.getItem("token") + "",
  };
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
    try {
      await loadNotes();
      setAlert({ message: "Loaded", show: true, type: "success" });
    } catch (e) {
      setAlert({ message: "Loaded", show: true, type: "error" });
    } finally {
      setLoading(false);
    }
  };
  const loadNotes = async () => {
    let response: Response = await fetch(properties.webnotesurl + "load", {
      method: "GET",
      headers: awsRequestHeader,
    });
    if (!response.ok) {
      throw response.statusText;
    }
    const data = await response.json();
    setNotes(data.message);
  };
  const deleteNote = async (id: number) => {
    setLoading(true);
    try {
      const param = id > 0 ? "?id=" + id : "";
      const response = await fetch(properties.webnotesurl + "delete" + param, {
        method: "GET",
        headers: awsRequestHeader,
      });
      if (!response.ok) {
        throw response.statusText;
      }
      await loadNotes();
      setAlert({ message: "Deleted", show: true, type: "success" });
    } catch (e) {
      setAlert({ message: "Deleted", show: true, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        properties.webnotesurl + "create?text=" + text,
        {
          method: "GET",
          headers: awsRequestHeader,
        }
      );
      if (!response.ok) {
        throw response.statusText;
      }
      await loadNotes();
      setAlert({ message: "Created", show: true, type: "success" });
    } catch (e) {
      setAlert({ message: "Created", show: true, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (id: number, text: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        properties.webnotesurl + "update?id=" + id + "&text=" + text,
        {
          method: "GET",
          headers: awsRequestHeader,
        }
      );
      if (!response.ok) {
        throw response.statusText;
      }
      await loadNotes();
      setAlert({ message: "Updated", show: true, type: "success" });
    } catch (e) {
      setAlert({ message: "Updated", show: true, type: "error" });
    } finally {
      setLoading(false);
    }
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
            <Button
              onClick={() => {
                secureLocalStorage.removeItem("token");
                window.location.replace(properties.authURL);
              }}
              label="Logout"
            ></Button>
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

export default NoteCrud;
