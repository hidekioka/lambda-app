import RequireAuth from "./components/RequireAuth.tsx";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <RequireAuth></RequireAuth>
    </BrowserRouter>
  );
}

export default App;
