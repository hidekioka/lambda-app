import { ReactNode } from "react";
import { useState, useEffect } from "react";

interface Props {
  children: ReactNode;
  show?: boolean;
}

const Alert = ({ children, show = false }: Props) => {
  const [showInternal, setShowInternal] = useState(show);
  return (
    <div
      className="alert alert-primary alert-dismissible fade show"
      role="alert"
      style={{ display: showInternal ? "block" : "none" }}
    >
      {children}
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
