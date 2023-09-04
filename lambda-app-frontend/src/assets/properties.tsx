const clientId: string = "3toccem3hj82utofgcpojogp88";
const responseType: string = "token";
const redirectURI: string = "http://localhost:5173";

// COGNITO address
const awsCognitoURL: string =
  "https://web-notes.auth.sa-east-1.amazoncognito.com/";

// REST API
const functionURL: string =
  "https://nkq7v0s6o2.execute-api.sa-east-1.amazonaws.com/default";

// HTTP API
// const functionURL: string =
//   "https://zcohs7rk32.execute-api.sa-east-1.amazonaws.com/default";

// Function with Container
// const lambdaFunction: string = "/java-container-";

// Function with Java code
const lambdaFunction: string = "/web-notes";
export const properties = {
  lambdaFunctionName: lambdaFunction, // REST API GATEWAY IN AWS
  webnotesurl: functionURL + lambdaFunction,
  authPageURL:
    awsCognitoURL +
    "login?client_id=" +
    clientId +
    "&response_type=" +
    responseType +
    "&redirect_uri=" +
    redirectURI,
  authAPIURL: awsCognitoURL + "/oauth2/userInfo",
};
