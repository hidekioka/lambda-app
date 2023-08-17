import ListGroup from "./components/ListGroup";
import Message from "./components/Message";
import Alert from "./components/Alert";
import Button from "./components/Button";
import { useState, useEffect } from "react";

function App() {
  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  const [notes, setNotes] = useState([]);

  const loadNotes = useEffect(() => {
    fetch(
      "https://zcohs7rk32.execute-api.sa-east-1.amazonaws.com/test-stage/web-notes-load"
    )
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      <div>
        <Alert>
          <h1>Hello World</h1>
        </Alert>
      </div>
      <div>
        <Button
          onClick={() => console.log("teste")}
          label="THIS BUTTON"
        ></Button>
      </div>
      <div>
        <ListGroup
          notes={notes}
          heading="==List=="
          onSelectItem={handleSelectItem}
        />
      </div>
    </>
  );
}

export default App;
