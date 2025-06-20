import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Home from "@mui/icons-material/Home";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import Person from "@mui/icons-material/Person";
import PersonOutline from "@mui/icons-material/PersonOutline";
import Settings from "@mui/icons-material/Settings";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import { type ReactNode } from "react";

type LinkType = {
  href: string;
  label: string;
  iconActive?: ReactNode;
  iconInactive?: ReactNode;
  children: string[];
  visibility: RouteVisibilityType;
};

export const RouteVisibility = {
  ALWAYS: "always" as const,
  AUTH: "auth" as const,
  UNAUTH: "unauth" as const,
};
type RouteVisibilityType =
  (typeof RouteVisibility)[keyof typeof RouteVisibility];

export const routes: LinkType[] = [
  {
    href: "/",
    label: "Home",
    iconActive: <Home />,
    iconInactive: <HomeOutlined />,
    children: ["/dances", "/dance-patterns", "/dances/new", "/dances/edit"],
    visibility: RouteVisibility.ALWAYS,
  },
  {
    href: "/favorites",
    label: "Favorites",
    iconActive: <Favorite />,
    iconInactive: <FavoriteBorder />,
    children: [],
    visibility: RouteVisibility.AUTH,
  },
  {
    href: "/auth",
    label: "Profile",
    iconActive: <Person />,
    iconInactive: <PersonOutline />,
    children: ["/auth/signup"],
    visibility: RouteVisibility.UNAUTH,
  },
  {
    href: "/settings",
    label: "Settings",
    iconActive: <Settings />,
    iconInactive: <SettingsOutlined />,
    children: [],
    visibility: RouteVisibility.ALWAYS,
  },
];
