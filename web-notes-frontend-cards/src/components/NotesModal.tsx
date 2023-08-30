import { ReactNode } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface Props {
  show: boolean;
  title: string;
  children: ReactNode;
  handleClose: () => void;
  handleSave: () => void;
}
function NotesModal(props: Props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.handleSave();
              props.handleClose();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NotesModal;
