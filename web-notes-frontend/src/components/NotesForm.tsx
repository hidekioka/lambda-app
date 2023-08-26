import { ChangeEvent } from "react";

interface Props {
  label?: string;
  textInput: string;
  handleTextChange: (event: ChangeEvent<any>) => void;
}

const NotesForm = (props: Props) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          {props.label}
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          value={props.textInput}
          onChange={props.handleTextChange}
        ></textarea>
      </div>
    </>
  );
};

export default NotesForm;
