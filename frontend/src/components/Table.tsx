import Note from "./Note";

interface Props {
  notes: Note[];
  heading: string;
  deleteNote: (id: number) => void;
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
          {prop.notes.map((note) => (
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
                      prop.deleteNote(note.id);
                    }}
                  ></button>
                  <button
                    type="button"
                    className="btn bi bi-pencil btn-outline-secondary"
                    onClick={() => {
                      console.log("edit");
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
