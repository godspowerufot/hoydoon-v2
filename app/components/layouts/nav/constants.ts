export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/sell", label: "Sell" },
  { href: "/agent", label: "Find an agent" },
];

export const NAV_LINKS_INNER = NAV_LINKS.filter((link) => link.href !== "/");
