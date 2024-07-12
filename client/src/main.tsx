import { ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { apolloClient } from "./apollo-client.ts";
import "./index.css";
import { browserRouter } from "./router.tsx";

const client = apolloClient;
const router = browserRouter;

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
  // </React.StrictMode>
);
