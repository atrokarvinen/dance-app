import { ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { apolloClient } from "./apollo-client.ts";
import "./index.css";
import { store } from "./redux/store.ts";
import { browserRouter } from "./router.tsx";

const client = apolloClient;
const router = browserRouter;

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </Provider>
  // </React.StrictMode>
);
