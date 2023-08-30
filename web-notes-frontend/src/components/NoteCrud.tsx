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
    Authorization:
      "eyJraWQiOiJremRDd3FibEtaajNORWoxVmVEaEd0OWdYK0VyTGpENGJDNnFRVkptVHUwPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiZHpjTm5LZHRieEk0UTJiUnJxek12QSIsInN1YiI6IjQzMGMxYWVhLTAwMjEtNzA2Yy04OGNjLThhZTgzOWQyMzEzMSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuc2EtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3NhLWVhc3QtMV9zREVWYWdOY3oiLCJjb2duaXRvOnVzZXJuYW1lIjoiNDMwYzFhZWEtMDAyMS03MDZjLTg4Y2MtOGFlODM5ZDIzMTMxIiwiYXVkIjoiM3RvY2NlbTNoajgydXRvZmdjcG9qb2dwODgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY5MzQwMzg0MiwiZXhwIjoxNjkzNDA3NDQyLCJpYXQiOjE2OTM0MDM4NDMsImp0aSI6Ijk3ZmE0NzliLWQzOTctNDE5Mi1hNjY5LTZkNmNhODQxNjY3MSIsImVtYWlsIjoib2thaGlkeEBnbWFpbC5jb20ifQ.RyC_6tV3TTLxfx34vXmDk8tTVDf6ge5HKvGgjOwUUrqZjZBzn2C6JmKX6eXGMOyLbjV8t6YqWCAaP3OF1wy9rb9F3U6CT4ZgI4auzxDtbDmPojUvLnPKVGzyov6eaO_Rg2m2S-A8HEv67L3Z7PXcjYx7Wutsk31Xra55CxLBURjpr6tUQ1enoZy6IYqRqdsyvGdhfCbd46WzNd9OoYhv-lIbrZQiCaJMGhMF064r1g0045N_koBcm2AOLMa5rYnFXlf8gjs-NOLXTWTg6s8sO_kxfeGKC6r_fIHiZTFeBQd9RSQg0HcSCx2EZkaHiZ6ov0mUOdLjUoe_5u-8ed8WAQ",
  };
  // let awsRequestHeader: HeadersInit = {
  //   Authorization:
  //     "eyJraWQiOiJoZ0wwTVwvTWp6RDNCYWV6eHdcL2NTaWwxcFlHWXBLNHVqSitDd0o1bGZTYmM9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0MzBjMWFlYS0wMDIxLTcwNmMtODhjYy04YWU4MzlkMjMxMzEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6Im9wZW5pZCIsImF1dGhfdGltZSI6MTY5MzQwMzg0MiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnNhLWVhc3QtMS5hbWF6b25hd3MuY29tXC9zYS1lYXN0LTFfc0RFVmFnTmN6IiwiZXhwIjoxNjkzNDA3NDQyLCJpYXQiOjE2OTM0MDM4NDMsInZlcnNpb24iOjIsImp0aSI6ImU2ZDI5OTE1LWE5ZDAtNGU5MS1iYmQzLTc0OWQ1MzQxNWZlNSIsImNsaWVudF9pZCI6IjN0b2NjZW0zaGo4MnV0b2ZnY3Bvam9ncDg4IiwidXNlcm5hbWUiOiI0MzBjMWFlYS0wMDIxLTcwNmMtODhjYy04YWU4MzlkMjMxMzEifQ.XALr72Y57JSA-f45wfH6_yUMi9SIYeVpsNmBYs_VSIokOEyEQzlP3aH2sobIVrzdbu68_l1_K3uyGFk2T_ozJ40oop6aRZ9FjLaPWNI5zqPuw8osRo9B2Mn4tClR1ihyoBtb8dnRn2wf_NxgGkYBQdNv71IlJs13KEfVWlNz7_JCqfyjte0MJ9uc1G-yi7uFFkSGzIG08Sg0T2x5L3hdUVxTKrDPcZeNy1UhKcxKdaDiIuKBLhQlm5EV-wZIVPD6JZe4VEVC4LD8ndwUTIyyXFh5meiieRnwWkGUFiSH-8ZSxd7nB9Yy31O6N1wQkcV1dNPbywBKFTgkpnvleRK2nA",
  // };
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
        properties.webnotesurl + "create?text=" + text
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
        properties.webnotesurl + "update?id=" + id + "&text=" + text
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
