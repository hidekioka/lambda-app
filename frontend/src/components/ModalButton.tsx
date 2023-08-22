interface Props {
  label: string;
  color?: "primary" | "outline-primary" | "secondary"; // ? means optional, the type are supported values, as not any string is available
  modalId: string;
}

// color = primary means default value
const Button = ({ label, color = "outline-primary", modalId }: Props) => {
  return (
    <button
      type="button"
      className={"btn btn-" + color}
      data-bs-toggle="modal"
      data-bs-target={"#" + modalId}
    >
      {label}
    </button>
  );
};

export default Button;
