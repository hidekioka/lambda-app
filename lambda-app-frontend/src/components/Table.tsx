import Note from "./Note";
import { useState } from "react";
import NotesModal from "./NotesModal";
import NotesForm from "./NotesForm";

interface Props {
  notes: Note[];
  heading: string;
  deleteFunction: (id: number) => void;
  updateFunction: (id: number, text: string) => void;
}
const Table = (props: Props) => {
  // Edit Modal variables
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Edit Form variables
  const [textInput, setTextInput] = useState("");
  const [selectedId, setSelectedId] = useState(-1);
  return (
    <>
      <NotesModal
        show={showModal}
        title="Edit"
        close={handleCloseModal}
        save={() => {
          props.updateFunction(selectedId, textInput);
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
      <h1 className="list-header">{props.heading}</h1>
      <table className="table  table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Text</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.notes.map((note) => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.text}</td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn bi bi-x-lg btn-outline-secondary"
                    aria-label="Close"
                    onClick={() => {
                      props.deleteFunction(note.id);
                    }}
                  ></button>
                  <button
                    type="button"
                    className="btn bi bi-pencil btn-outline-secondary"
                    onClick={() => {
                      setSelectedId(note.id);
                      handleShowModal();
                    }}
                  ></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
