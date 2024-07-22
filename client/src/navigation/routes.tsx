import { Favorite, Home, Person, Settings } from "@mui/icons-material";
import { ReactNode } from "react";

type LinkType = {
  href: string;
  label: string;
  icon?: ReactNode;
  children: string[];
  visibility: RouteVisibility;
};

export enum RouteVisibility {
  ALWAYS,
  AUTH,
  UNAUTH,
}

export const routes: LinkType[] = [
  {
    href: "/",
    label: "Home",
    icon: <Home />,
    children: ["/dances", "/dance-patterns", "/dances/new", "/dances/edit"],
    visibility: RouteVisibility.ALWAYS,
  },
  {
    href: "/favorites",
    label: "Favorites",
    icon: <Favorite />,
    children: [],
    visibility: RouteVisibility.AUTH,
  },
  {
    href: "/auth",
    label: "Auth",
    icon: <Person />,
    children: ["/auth/signup"],
    visibility: RouteVisibility.UNAUTH,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: <Settings />,
    children: [],
    visibility: RouteVisibility.ALWAYS,
  },
];
