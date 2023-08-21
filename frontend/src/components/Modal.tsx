import React from "react";
import Form from "./Form";
import Button from "./Button";
import { useState, useEffect } from "react";

const Modal = () => {
  const [textInput, setTextInput] = useState("");
  const handleTextChange = (event: React.ChangeEvent<any>) => {
    setTextInput(event.target.value);
    console.log(event.target.value);
  };
  const createNote = () => {
    fetch(
      "https://zcohs7rk32.execute-api.sa-east-1.amazonaws.com/test-stage/web-notes-create?text=" +
        textInput
    )
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="modal" id="exampleModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <Form
              textInput={textInput}
              handleTextChange={handleTextChange}
            ></Form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
            <Button
              onClick={() => {
                createNote();
              }}
              label="Create"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
