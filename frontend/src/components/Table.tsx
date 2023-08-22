import React from "react";

interface Props {
  notes: Note[];
  heading: string;
  deleteNote: (id: number) => void;
}
interface Note {
  id: number;
  text: string;
}
const Table = (prop: Props) => {
  return (
    <>
      <h1 className="list-header">{prop.heading}</h1>
      <table className="table  table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Text</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prop.notes.map((note, index) => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.text}</td>
              <td>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    prop.deleteNote(note.id);
                  }}
                ></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
