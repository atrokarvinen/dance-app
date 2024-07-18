import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { AuthPage } from "./auth/auth-page";
import { SignupView } from "./auth/signup-view";
import { DanceDetailsPage } from "./dance/dance-details-page";
import { DanceList } from "./dance/dance-list";
import { DancePatternDetailsPage } from "./dance/dance-pattern-details/dance-pattern-details-page";
import { FavoriteList } from "./dance/favorite-list";

export const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DanceList />,
      },
      {
        path: "/dances/:danceId",
        element: <DanceDetailsPage />,
      },
      {
        path: "/favorites",
        element: <FavoriteList />,
      },
      {
        path: "/dance-patterns/:dancePatternId",
        element: <DancePatternDetailsPage />,
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
