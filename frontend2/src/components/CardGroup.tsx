import React from "react";
import Card from "./Card";
import { Note } from "../model";

interface Props {
  notes: Note[];
}
function CardGroup(props: Props) {
  return (
    <div>
      {props.notes.map((note) => (
        <Card note={note} key={note.id}></Card>
      ))}
    </div>
  );
}

export default CardGroup;
