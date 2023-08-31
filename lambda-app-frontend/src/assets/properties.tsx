// const lambdaFunction: string = "/java-container-";
const lambdaFunction: string = "/web-notes";
const clientId: string = "3toccem3hj82utofgcpojogp88";
const responseType: string = "token";
const redirectURI: string = "http://localhost:5173";
const awsCognitoURL: string =
  "https://web-notes.auth.sa-east-1.amazoncognito.com/login";
export const properties = {
  lambdaFunctionName: lambdaFunction, // REST API GATEWAY IN AWS
  webnotesurl:
    "https://nkq7v0s6o2.execute-api.sa-east-1.amazonaws.com/default" +
    lambdaFunction,
  //   webnotesurl:
  //     "https://zcohs7rk32.execute-api.sa-east-1.amazonaws.com/default" +
  //     lambdaFunction,
  authURL:
    awsCognitoURL +
    "?client_id=" +
    clientId +
    "&response_type=" +
    responseType +
    "&redirect_uri=" +
    redirectURI,
};
