interface Props {
  notes: Note[];
  heading: string;
  onSelectItem: (item: string) => void;
}
interface Note {
  id: number;
  text: string;
}

import { useState } from "react";

function ListGroup({ notes, heading, onSelectItem }: Props) {
  // or props: Props and all call will be made like props.item
  const noItemsMessageAnd = notes.length === 0 && (
    <li className="list-group-item">No items found</li>
  );

  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <div className="main-list">
      <h1 className="list-header">{heading}</h1>
      <ul className="list-group">
        {noItemsMessageAnd}
        {notes.map((note, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={note.id}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(note.text);
              onSelectItem(note.id.toString());
            }}
          >
            {" "}
            {note.text}
          </li>
        ))}{" "}
      </ul>
    </div>
  );
}

export default ListGroup;
