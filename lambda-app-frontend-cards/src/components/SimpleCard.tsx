import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Note } from "../model";
import ReactMarkdown from "react-markdown";

interface Props {
  note: Note;
  handleDelete: (note: Note) => void;
  handleEdit: (note: Note) => void;
}
function SimpleCard(props: Props) {
  return (
    <Card style={{ width: "18rem" }} className="web-notes-card">
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Header className="web-notes-card-header">
        <div>{props.note.title}</div>
        <ButtonGroup>
          <Button
            className="bi bi-pencil web-notes-iconed-button"
            variant="outline-secondary"
            onClick={() => {
              props.handleEdit(props.note);
            }}
          ></Button>
          <Button
            className="bi bi-x-lg web-notes-iconed-button"
            variant="outline-secondary"
            onClick={() => {
              props.handleDelete(props.note);
            }}
          ></Button>
        </ButtonGroup>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <ReactMarkdown>{props.note.description}</ReactMarkdown>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SimpleCard;
