import React from "react";
import Button from "./Button";

interface Props {
  textInput: string;
  handleTextChange: (event: React.ChangeEvent<any>) => void;
}

const Form = ({ textInput, handleTextChange }: Props) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Example textarea
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          value={textInput}
          onChange={handleTextChange}
        ></textarea>
      </div>
    </>
  );
};

export default Form;
