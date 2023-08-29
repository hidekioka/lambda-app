import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "dark");
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
