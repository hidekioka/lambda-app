import { useState } from "react";

// Fragment is useful for encapsuling elements since React functions can only return 1 element
// Can also be used without import Fragment and returning a element without anything (syntax: <>)
function ListGroup() {
  // const is a variable that does not change
  //const list = ["First element", "Second element", "Third element"];
  // let is a changable variable
  let list = ["First element", "Second element", "Third element"];
  const noItemsMessageTernary =
    list.length === 0 ? <p>No items found ternary</p> : null;
  const noItemsMessageAnd = list.length === 0 && <p>No items found and</p>;
  const getMessage = (text: string) => {
    return list.length === 0 ? <p>{text}</p> : null;
  };
  //EventHandler
  const handleClick = (event: React.MouseEvent) => console.log(event);

  // Hook for state, without it the selected index won't work
  // let selectedIndex = 0; -> variable like this won't work
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //arr[0]; // variable (selectedIndex)
  //arr[1]; // updated function
  return (
    <>
      <h1>List</h1>
      {noItemsMessageTernary}
      {noItemsMessageAnd}
      {getMessage("no items found param")}
      <ul className="list-group">
        {" "}
        {list.map((i, index) => (
          // key is and identification inside the <li>, should be used so React can reach this element if needed
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={i}
            // onClick={(event) => console.log(i, index, event)} --> example of inline function
            // onClick={handleClick} --> example of onclick calling existing function
            onClick={() => setSelectedIndex(index)}
          >
            {" "}
            {i}
          </li>
        ))}{" "}
      </ul>
    </>
  );
  //   return (
  //     <Fragment>
  //       <h1>List</h1>
  //       <ul className="list-group">
  //         <li className="list-group-item">An item</li>
  //         <li className="list-group-item">A second item</li>
  //         <li className="list-group-item">A third item</li>
  //         <li className="list-group-item">A fourth item</li>
  //         <li className="list-group-item">And a fifth one</li>
  //       </ul>
  //     </Fragment>
  //   );
}

export default ListGroup;
