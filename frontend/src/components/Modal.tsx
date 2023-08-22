import Form from "./Form";
import Button from "./Button";
import React from "react";

interface Props {
  setTextInput: React.Dispatch<React.SetStateAction<string>>;
  textInput: string;
  createNote: () => void;
  modalId: string;
}
const Modal = ({ setTextInput, textInput, createNote, modalId }: Props) => {
  const closeButton = React.useRef<HTMLButtonElement>(null);
  const handleTextChange = (event: React.ChangeEvent<any>) => {
    setTextInput(event.target.value);
  };
  return (
    <>
      <div className="modal" id={modalId}>
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
                ref={closeButton}
              >
                Close
              </button>
              <Button
                onClick={() => {
                  closeButton.current?.click();
                  createNote();
                }}
                label="Create"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
