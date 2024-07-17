import { createBrowserRouter } from "react-router-dom";
import { AuthPage } from "./auth/auth-page";
import { SignupView } from "./auth/signup-view";
import { DanceDetailsPage } from "./dance/dance-details-page";
import { DanceList } from "./dance/dance-list";
import { DancePatternDetailsPage } from "./dance/dance-pattern-details/dance-pattern-details-page";
import { FavoriteList } from "./dance/favorite-list";
import { Navigation } from "./navigation/navigation";

export const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        path: "/dances",
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
