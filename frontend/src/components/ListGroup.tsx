import { Fragment } from "react";

// Fragment is useful for encapsuling elements since React functions can only return 1 element
// Can also be used without import Fragment and returning a element without anything (syntax: <>)
function ListGroup() {
  // const is a variable that does not change
  //const list = ["First element", "Second element", "Third element"];
  // let is a changable variable
  let list = ["First element", "Second element", "Third element"];
  list = [];
  const noItemsMessageTernary =
    list.length === 0 ? <p>No items found ternary</p> : null;
  const noItemsMessageAnd = list.length === 0 && <p>No items found and</p>;
  const getMessage = (text: string) => {
    return list.length === 0 ? <p>{text}</p> : null;
  };
  return (
    <>
      <h1>List</h1>
      {noItemsMessageTernary}
      {noItemsMessageAnd}
      {getMessage("no items found param")}
      <ul className="list-group">
        {" "}
        {list.map((i) => (
          // key is and identification inside the <li>, should be used so React can reach this element if needed
          <li className="list-group-item" key={i}>
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
