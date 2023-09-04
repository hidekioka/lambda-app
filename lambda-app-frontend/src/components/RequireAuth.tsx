import NoteCrud from "./NoteCrud.tsx";
import { useEffect } from "react";
import { properties } from "../assets/properties.js";
import secureLocalStorage from "react-secure-storage";


function RequireAuth() {
  if (secureLocalStorage.getItem("token") == null) {
    try {
      secureLocalStorage.setItem(
        "token",
        window.location.href.split("#")[1].split("&")[0].split("=")[1]
      );
      secureLocalStorage.setItem(
        "accessToken",
        window.location.href.split("#")[1].split("&")[1].split("=")[1]
      );
    } catch (error) {
      secureLocalStorage.removeItem("token");
      secureLocalStorage.removeItem("accessToken");
    }
  }

  if (secureLocalStorage.getItem("token") == null) {
    useEffect(() => {
      window.location.replace(properties.authPageURL);
    }, []);
  }
  return <NoteCrud></NoteCrud>;
}

export default RequireAuth;
