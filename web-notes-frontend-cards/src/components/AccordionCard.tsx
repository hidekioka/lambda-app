import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Note } from "../model";
import ReactMarkdown from "react-markdown";

interface Props {
  note: Note;
}

// special characters are escaped by \ before, `` makes a multiline string
const mdtext: string = `# A demo of \`react-markdown\``;

function AccordionCard(props: Props) {
  return (
    <Accordion className="web-notes-card">
      <Accordion.Item
        eventKey={String(props.note.id)}
        className="web-notes-card-inner"
      >
        <Accordion.Header>
          {props.note.title}
          <Button className="bi bi-x-lg"></Button>
        </Accordion.Header>
        <Accordion.Body>
          <ReactMarkdown>{props.note.description}</ReactMarkdown>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionCard;
