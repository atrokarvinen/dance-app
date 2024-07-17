type LinkType = {
  href: string;
  label: string;
};

export const routes: LinkType[] = [
  { href: "/", label: "Home" },
  { href: "/dances", label: "Dances" },
  { href: "/favorites", label: "Favorites" },
  { href: "/auth", label: "Auth" },
];
