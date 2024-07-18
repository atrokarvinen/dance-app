import { Container, Stack } from "@mui/material";
import { ReactNode } from "react";
import { ScrollRestoration } from "react-router-dom";
import { NavigationMobile } from "../navigation/navigation-mobile";

type Props = {
  children: ReactNode;
};

export const LayoutMobile = ({ children }: Props) => {
  return (
    <Stack direction="column" height="100%" maxHeight="100%">
      <ScrollRestoration />
      <Container sx={{ flex: 1, flexGrow: 1, maxHeight: "calc(100% - 56px)" }}>
        {children}
      </Container>
      <NavigationMobile />
    </Stack>
  );
};
