import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { Note } from "../model";

interface Props {
  note: Note;
}
function Card(props: Props) {
  return (
    <Accordion className="web-notes-card">
      <Accordion.Item eventKey={String(props.note.id)}>
        <Accordion.Header>{props.note.title}</Accordion.Header>
        <Accordion.Body>{props.note.description}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Card;
