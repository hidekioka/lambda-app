import { useSearchParams } from "react-router-dom";
import NoteCrud from "./NoteCrud.tsx";
import { useState, useEffect } from "react";
import { properties } from "../assets/properties.js";

function RequireAuth() {
  const [authed, setAuthed] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(window.location.href.split("#")[1].split("&")[0].split("=")[1]);

  if (authed === false) {
    useEffect(() => {
      window.location.replace(properties.authURL);
    }, []);
  }
  return <NoteCrud></NoteCrud>;
}

export default RequireAuth;
