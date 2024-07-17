import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { apolloClient } from "./apollo-client.ts";
import { MuiStyleProvider } from "./layout/mui-style-provider.tsx";
import { store } from "./redux/store.ts";
import { browserRouter } from "./router.tsx";

const client = apolloClient;
const router = browserRouter;

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ApolloProvider client={client}>
      <MuiStyleProvider>
        <RouterProvider router={router} />
      </MuiStyleProvider>
    </ApolloProvider>
  </Provider>
  // </React.StrictMode>
);
