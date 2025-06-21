import type { ReactNode } from "react";
import { useAppSelector } from "../../redux/store";
import { selectIsAuthenticated } from "../auth-store";

type Props = {
  children: ReactNode;
};

export const AuthorizedVisibility = ({ children }: Props) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? <>{children}</> : null;
};
