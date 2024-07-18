import { Favorite, Home, Person } from "@mui/icons-material";
import { ReactNode } from "react";

type LinkType = {
  href: string;
  label: string;
  icon?: ReactNode;
};

export const routes: LinkType[] = [
  { href: "/", label: "Home", icon: <Home /> },
  { href: "/favorites", label: "Favorites", icon: <Favorite /> },
  { href: "/auth", label: "Auth", icon: <Person /> },
];
