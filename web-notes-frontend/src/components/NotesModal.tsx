import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ReactNode } from "react";

interface Props {
  show: boolean;
  title?: string;
  children: ReactNode;
  close: () => void;
  save: () => void;
}
const NotesModal = (props: Props) => {
  return (
    <>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>{props.children}</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={props.close}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                props.close();
                props.save();
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default NotesModal;
