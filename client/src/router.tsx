import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { AuthPage } from "./auth/auth-page";
import { SignupView } from "./auth/signup-view";
import { DanceDetails } from "./dance/dance-details";
import { DanceList } from "./dance/dance-list";
import { DancePatternDetails } from "./dance/dance-pattern-details";
import { FavoriteList } from "./dance/favorite-list";
import { Navigation } from "./navigation/navigation";

export const browserRouter = createBrowserRouter([
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
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/auth/signup",
        element: <SignupView />,
      },
    ],
  },
]);
