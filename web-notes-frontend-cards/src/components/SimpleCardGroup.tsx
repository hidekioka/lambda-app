import React from "react";
import CardGroup from "react-bootstrap/CardGroup";
import SimpleCard from "./SimpleCard";
import { Note } from "../model";

interface Props {
  notes: Note[];
  handleDelete: (note: Note) => void;
  handleEdit: (note: Note) => void;
}
function SimpleCardGroup(props: Props) {
  return (
    // <div className="web-notes-card-group">
    //   {props.notes.map((note) => (
    //     <AccordionCard note={note} key={note.id}></AccordionCard>
    //   ))}
    // </div>
    <div className="web-notes-card-group">
      {props.notes.map((note) => (
        <SimpleCard
          note={note}
          key={note.id}
          handleDelete={props.handleDelete}
          handleEdit={props.handleEdit}
        ></SimpleCard>
      ))}
    </div>
  );
}

export default SimpleCardGroup;
