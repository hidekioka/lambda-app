import secureLocalStorage from "react-secure-storage";
import { properties } from "../assets/properties.js";

export default async function fetchPlus(
  url: string,
  method: string,
  param?: string
) {
  let awsRequestHeader: HeadersInit = {
    Authorization: secureLocalStorage.getItem("token") + "",
  };
  param = param || "";
  let response: Response = await fetch(url + param, {
    method: method,
    headers: awsRequestHeader,
  });
  if (response.status == 401) {
    secureLocalStorage.removeItem("token");
    secureLocalStorage.removeItem("accesToken");
    window.location.replace(properties.authPageURL);
  }
  if (!response.ok) {
    throw response.statusText;
  }
  return response;
}
