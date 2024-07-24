import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { AuthPage } from "./auth/auth-page";
import { SignupView } from "./auth/signup-view";
import { DanceDetailsPage } from "./dance/dance-details/dance-details-page";
import { DanceList } from "./dance/dance-list/dance-list";
import { DancePatternDetailsPage } from "./dance/dance-pattern-details/dance-pattern-details-page";
import { AddDancePatternPage } from "./dance/edit-dance-pattern/add-dance-pattern-page";
import { EditDancePatternPage } from "./dance/edit-dance-pattern/edit-dance-pattern-page";
import { AddDancePage } from "./dance/edit-dance/add-dance-page";
import { EditDancePage } from "./dance/edit-dance/edit-dance-page";
import { FavoriteList } from "./dance/favorite-list";
import { TestPage } from "./dance/test-page/test-page";
import { SettingsPage } from "./settings/settings-page";

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
        path: "/dances/new",
        element: <AddDancePage />,
      },
      {
        path: "/dances/edit/:danceId",
        element: <EditDancePage />,
      },
      {
        path: "/favorites",
        element: <FavoriteList />,
      },
      {
        path: "dances/:danceId/dance-patterns/new",
        element: <AddDancePatternPage />,
      },
      {
        path: "dances/:danceId/dance-patterns/:dancePatternId/edit",
        element: <EditDancePatternPage />,
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
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/test",
        element: <TestPage />,
      },
    ],
  },
]);
