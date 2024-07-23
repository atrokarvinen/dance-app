import {
  Favorite,
  FavoriteBorder,
  Home,
  HomeOutlined,
  Person,
  PersonOutline,
  Settings,
  SettingsOutlined,
} from "@mui/icons-material";
import { ReactNode } from "react";

type LinkType = {
  href: string;
  label: string;
  iconActive?: ReactNode;
  iconInactive?: ReactNode;
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
    label: "Auth",
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
