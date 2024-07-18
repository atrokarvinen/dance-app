import { Container, Stack } from "@mui/material";
import { ReactNode } from "react";
import { NavigationMobile } from "../navigation/navigation-mobile";

type Props = {
  children: ReactNode;
};

export const LayoutMobile = ({ children }: Props) => {
  return (
    <Stack direction={"column"} height={"100%"}>
      <Container sx={{ flex: 1, overflowY: "auto" }}>{children}</Container>
      <NavigationMobile />
    </Stack>
  );
};
