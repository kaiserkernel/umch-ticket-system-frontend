const Menu = [
  {
    path: "/email",
    icon: "bi bi-envelope",
    title: "Tickets",
    children: [
      { path: "/email/inbox", title: "All Tickets" },
      { path: "/email/compose", title: "Internal Message" },
    ],
  },
  { path: "/profile", icon: "bi bi-people", title: "Profile" },
  {
    path: "/account-management",
    icon: "bi bi-collection",
    title: "Account Management",
  },
];

export default Menu;
