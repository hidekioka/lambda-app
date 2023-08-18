import React from "react";
import Button from "./Button";

const Form = () => {
  const createNote = () => {
    fetch(
      "https://zcohs7rk32.execute-api.sa-east-1.amazonaws.com/test-stage/web-notes-load",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: "react example" }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="mb-3">
        {/* <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        /> */}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Example textarea
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
        ></textarea>
      </div>
      <Button onClick={createNote} label="Create"></Button>
    </>
  );
};

export default Form;
