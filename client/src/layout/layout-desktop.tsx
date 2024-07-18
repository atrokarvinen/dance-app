import { Container } from "@mui/material";
import { ReactNode } from "react";
import { NavigationDesktop } from "../navigation/navigation-desktop";

type Props = {
  children: ReactNode;
};

export const LayoutDesktop = ({ children }: Props) => {
  return (
    <>
      <NavigationDesktop />
      <Container>{children}</Container>
    </>
  );
};
