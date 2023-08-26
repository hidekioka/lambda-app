import React from "react";

interface Props {
  label: string;
  color?: "primary" | "outline-primary" | "secondary"; // ? means optional, the type are supported values, as not any string is available
  onClick: () => void;
}
// color = primary means default value
const Button = ({ label, onClick, color = "outline-primary" }: Props) => {
  return (
    <button className={"btn btn-" + color} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
