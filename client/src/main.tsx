import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App.tsx";
import { DanceDetails } from "./dance/dance-details.tsx";
import { DanceList } from "./dance/dance-list.tsx";
import { DancePatternDetails } from "./dance/dance-pattern-details.tsx";
import { FavoriteList } from "./dance/favorite-list.tsx";
import "./index.css";
import { Navigation } from "./navigation/navigation.tsx";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        path: "/books",
        element: <App />,
      },
      {
        path: "/dances",
        element: <DanceList />,
      },
      {
        path: "/dances/:danceId",
        element: <DanceDetails />,
      },
      {
        path: "/favorites",
        element: <FavoriteList />,
      },
      {
        path: "/dance-patterns/:dancePatternId",
        element: <DancePatternDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
  // </React.StrictMode>
);
