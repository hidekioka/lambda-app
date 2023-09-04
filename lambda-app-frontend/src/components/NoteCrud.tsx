import Alert from "./Alert.js";
import Button from "./NotesButton.js";
import NotesModal from "./NotesModal.js";
import NotesForm from "./NotesForm.js";
import Table from "./Table.js";
import { useState, useEffect } from "react";
import { properties } from "../assets/properties.js";
import secureLocalStorage from "react-secure-storage";
import fetchPlus from "./Utils.tsx";

function NoteCrud() {
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
    const token = secureLocalStorage.getItem("accessToken");
    const response = await fetchPlus(
      properties.webnotesurl + "?token=" + token,
      "GET"
    );
    const data = await response.json();
    setNotes(JSON.parse(data.message));
  };
  const deleteNote = async (id: number) => {
    setLoading(true);
    try {
      const token = secureLocalStorage.getItem("accessToken");
      const paramId = id > 0 ? "?id=" + id : "";
      await fetchPlus(
        properties.webnotesurl + paramId + "&token=" + token,
        "DELETE"
      );
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
      const token = secureLocalStorage.getItem("accessToken");
      const param = "?text=" + text + "&token=" + token;
      await fetchPlus(properties.webnotesurl, "POST", param);
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
      const token = secureLocalStorage.getItem("accessToken");
      const param = "?id=" + id + "&text=" + text + "&token=" + token;
      await fetchPlus(properties.webnotesurl, "PATCH", param);
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
                secureLocalStorage.removeItem("accesToken");
                window.location.replace(properties.authPageURL);
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
