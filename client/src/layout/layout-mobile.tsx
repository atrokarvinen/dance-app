import { Container, Stack } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { NavigationMobile } from "../navigation/navigation-mobile";
import { useScrollRestoration } from "./use-scroll-restoration";

type Props = {
  children: ReactNode;
};

export const LayoutMobile = ({ children }: Props) => {
  const scrollCallback = (opt: ScrollToOptions) => {
    window.scrollTo(opt);
  };
  const { handleScroll } = useScrollRestoration(scrollCallback);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <Stack direction="column" sx={{ height: "100%", maxHeight: "100%" }}>
      <NavigationMobile />
      <Container sx={{ p: 1 }}>{children}</Container>
    </Stack>
  );
};
