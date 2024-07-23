import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectContentScrollOfPage, setContentScroll } from "./ui-store";

type ScrollRestoreOption = {
  to: string;
  from?: string;
  behavior?: "smooth" | "auto" | "instant";
};

const scrollRestoreOptions: ScrollRestoreOption[] = [
  { to: "/", behavior: "smooth" },
  { to: "/", from: "/dances/*", behavior: "instant" },
  { to: "/dances/*", behavior: "smooth" },
  { to: "/dances/*", from: "/dance-patterns/*", behavior: "instant" },
  { to: "/favorites", from: "/dance-patterns/*", behavior: "instant" },
];

type Pathing = {
  from: string;
  to: string;
};

const defaultScrollOption: ScrollToOptions = {
  top: 0,
  behavior: "instant",
};

export const useScrollRestoration = (
  scrollCallback: (opt: ScrollToOptions) => void
) => {
  const [previousPath, setPreviousPath] = useState<string>();
  const [pathing, setPathing] = useState<Pathing>();
  const { pathname } = useLocation();
  const initialScroll = useAppSelector(selectContentScrollOfPage(pathname));
  const [scrollInitialized, setScrollInitialized] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setScrollInitialized(false);
    setPathing({ from: previousPath ?? "", to: pathname });
    setPreviousPath(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!scrollInitialized && pathing) {
      console.log("initializing scroll...");
      setScrollInitialized(true);
      const { from, to } = pathing;
      const scrollOption = findRestorationOption(from, to);
      if (!scrollOption) {
        console.log(
          `no scroll restoration defined for pathing ${from} => ${to}`
        );
        return scrollCallback(defaultScrollOption);
      }
      const options: ScrollToOptions = {
        top: initialScroll,
        behavior: scrollOption.behavior || "instant",
      };
      scrollCallback(options);
    }
  }, [initialScroll, scrollInitialized]);

  const findRestorationOption = (from: string, to: string) => {
    if (from === to) {
      console.log("from === to");
      return undefined;
    }
    const options = scrollRestoreOptions.filter((opt) =>
      testRouteMatches(to, opt.to)
    );
    if (options.length === 0) {
      return undefined;
    }
    const exactMatch = options
      .filter((opt) => opt.from)
      .find((opt) => testRouteMatches(from, opt.from!));
    const defaultMatch = options.find((opt) => !opt.from);
    const option = exactMatch || defaultMatch;

    console.log(
      `Matched '${from}' => '${to}' to scroll behavior: ${option?.behavior}. Target: ${initialScroll}`
    );

    return option;
  };

  const testRouteMatches = (route: string, expected: string) => {
    const parts = route.split("/");
    const expectedParts = expected.split("/");

    if (parts.length !== expectedParts.length) {
      return false;
    }
    // console.log(parts, expectedParts);

    const matches = parts.map((part, index) => {
      if (expectedParts[index] === "*") {
        return true;
      }
      return part === expectedParts[index];
    });

    // console.log(matches);

    return matches.every((match) => match);
  };

  const handleScroll = (_: any) => {
    // const scroll = e.currentTarget.scrollTop;
    const scroll = window.scrollY;
    dispatch(setContentScroll({ path: pathname, scroll }));
  };

  return { handleScroll };
};
