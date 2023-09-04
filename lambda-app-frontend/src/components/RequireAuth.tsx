import NoteCrud from "./NoteCrud.tsx";
import { useEffect } from "react";
import { properties } from "../assets/properties.js";
import secureLocalStorage from "react-secure-storage";


function RequireAuth() {
  if (secureLocalStorage.getItem("token") == null) {
    try {
      console.log("token");
      secureLocalStorage.setItem(
        "token",
        window.location.href.split("#")[1].split("&")[0].split("=")[1]
      );
      console.log("fetch");
      fetch(properties.authAPIURL, {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " +
            window.location.href.split("#")[1].split("&")[1].split("=")[1],
        },
      })
        .then((response) => response.json())
        .then((data) => secureLocalStorage.setItem("userEmail", data.email));
    } catch (error) {
      secureLocalStorage.removeItem("token");
      secureLocalStorage.removeItem("userEmail");
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
