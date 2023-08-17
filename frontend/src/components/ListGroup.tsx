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
  const noItemsMessageAnd = notes.length === 0 && <p>No items found and</p>;

  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      <h1>{heading}</h1>
      {noItemsMessageAnd}
      <ul className="list-group">
        {" "}
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
            }}
          >
            {" "}
            {note.text}
          </li>
        ))}{" "}
      </ul>
    </>
  );
}

export default ListGroup;
