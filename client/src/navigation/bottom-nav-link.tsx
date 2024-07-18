import React from "react";
import { Link } from "react-router-dom";

type Props = {
  href: string;
};

export const BottomNavLink = React.forwardRef<HTMLAnchorElement, Props>(
  ({ href, ...props }, ref) => {
    return <Link to={href} ref={ref} {...props} />;
  }
);
