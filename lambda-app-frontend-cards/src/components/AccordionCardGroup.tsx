import React from "react";
import AccordionCard from "./AccordionCard";
import { Note } from "../model";

interface Props {
  notes: Note[];
}
function AccordionCardGroup(props: Props) {
  return (
    <div className="web-notes-card-group">
      {props.notes.map((note) => (
        <AccordionCard note={note} key={note.id}></AccordionCard>
      ))}
    </div>
  );
}

export default AccordionCardGroup;
