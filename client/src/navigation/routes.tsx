import { Favorite, Home, Person, Search } from "@mui/icons-material";
import { ReactNode } from "react";

type LinkType = {
  href: string;
  label: string;
  icon?: ReactNode;
};

export const routes: LinkType[] = [
  { href: "/", label: "Home", icon: <Home /> },
  { href: "/dances", label: "Dances", icon: <Search /> },
  { href: "/favorites", label: "Favorites", icon: <Favorite /> },
  { href: "/auth", label: "Auth", icon: <Person /> },
];
