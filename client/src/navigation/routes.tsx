import { Favorite, Home, Person } from "@mui/icons-material";
import { ReactNode } from "react";

type LinkType = {
  href: string;
  label: string;
  icon?: ReactNode;
  children: string[];
};

export const routes: LinkType[] = [
  {
    href: "/",
    label: "Home",
    icon: <Home />,
    children: ["/dances", "/dance-patterns"],
  },
  { href: "/favorites", label: "Favorites", icon: <Favorite />, children: [] },
  { href: "/auth", label: "Auth", icon: <Person />, children: [] },
];
