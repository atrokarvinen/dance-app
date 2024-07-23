import { Container, Stack } from "@mui/material";
import { ReactNode, useEffect, useRef } from "react";
import { NavigationMobile } from "../navigation/navigation-mobile";
import { useScrollRestoration } from "./use-scroll-restoration";

type Props = {
  children: ReactNode;
};

export const LayoutMobile = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollCallback = (opt: ScrollToOptions) => {
    if (!containerRef.current) return;
    // containerRef.current.scrollTo(opt);
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
      <Container
        ref={containerRef}
        sx={
          {
            // flex: 1,
            // maxHeight: "calc(100% - 56px)",
            // overflowY: "auto",
          }
        }
        onScroll={handleScroll}
      >
        {children}
      </Container>
    </Stack>
  );
};
