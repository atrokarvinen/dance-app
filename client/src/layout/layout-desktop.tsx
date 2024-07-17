import { Container } from "@mui/material";
import { ReactNode } from "react";
import { Navigation } from "../navigation/navigation";

type Props = {
  children: ReactNode;
};

export const LayoutDesktop = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      <Container>{children}</Container>
    </>
  );
};
