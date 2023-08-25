import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { Note } from "../model";

interface Props {
  note: Note;
}
function AccordionCard(props: Props) {
  return (
    <Accordion className="web-notes-card">
      <Accordion.Item
        eventKey={String(props.note.id)}
        className="web-notes-card-inner"
      >
        <Accordion.Header>{props.note.text}</Accordion.Header>
        <Accordion.Body>{props.note.text}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionCard;
