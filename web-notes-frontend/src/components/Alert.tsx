import { ReactNode } from "react";
import { useState } from "react";

interface Props {
  children: ReactNode;
  show?: boolean;
  type: string;
}

const Alert = (props: Props) => {
  const [showInternal, setShowInternal] = useState(props.show);
  return (
    <div
      className={
        (props.type === "success"
          ? "alert alert-success"
          : "alert alert-danger") + " alert alert-dismissible fade show"
      }
      role="alert"
      style={{ display: showInternal ? "block" : "none" }}
    >
      {props.children}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        style={{ display: showInternal ? "block" : "none" }}
        onClick={() => {
          setShowInternal(false);
        }}
      ></button>
    </div>
  );
};

export default Alert;
