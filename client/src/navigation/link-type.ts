import type { ReactNode } from "react";
import type { RouteVisibilityType } from "./route-visibility";

export type LinkType = {
  href: string;
  label: string;
  iconActive?: ReactNode;
  iconInactive?: ReactNode;
  children: string[];
  visibility: RouteVisibilityType;
};
