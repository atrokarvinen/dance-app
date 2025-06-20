import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Home from "@mui/icons-material/Home";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import Person from "@mui/icons-material/Person";
import PersonOutline from "@mui/icons-material/PersonOutline";
import Settings from "@mui/icons-material/Settings";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import { useTranslation } from "react-i18next";
import type { LinkType } from "./link-type";
import { RouteVisibility } from "./route-visibility";

export const useRoutes = () => {
  const { t } = useTranslation();
  const routes: LinkType[] = [
    {
      href: "/",
      label: t("Home"),
      iconActive: <Home />,
      iconInactive: <HomeOutlined />,
      children: ["/dances", "/dance-patterns", "/dances/new", "/dances/edit"],
      visibility: RouteVisibility.ALWAYS,
    },
    {
      href: "/favorites",
      label: t("Favorites"),
      iconActive: <Favorite />,
      iconInactive: <FavoriteBorder />,
      children: [],
      visibility: RouteVisibility.AUTH,
    },
    {
      href: "/auth",
      label: t("Profile"),
      iconActive: <Person />,
      iconInactive: <PersonOutline />,
      children: ["/auth/signup"],
      visibility: RouteVisibility.UNAUTH,
    },
    {
      href: "/settings",
      label: t("Settings"),
      iconActive: <Settings />,
      iconInactive: <SettingsOutlined />,
      children: [],
      visibility: RouteVisibility.ALWAYS,
    },
  ];

  return { routes };
};
