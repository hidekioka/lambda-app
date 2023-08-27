import React from "react";
import AccordionCard from "./AccordionCard";
import { Note } from "../model";

interface Props {
  notes: Note[];
}
function CardGroup(props: Props) {
  console.log(props.notes);
  console.log(Array.isArray(props.notes));
  return (
    <div className="web-notes-card-group">
      {props.notes.map((note) => (
        <AccordionCard note={note} key={note.id}></AccordionCard>
      ))}
    </div>
  );
}

export default CardGroup;
