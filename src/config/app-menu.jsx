const Menu = [
  {
    path: "/email",
    icon: "bi bi-envelope",
    title: "Email",
    children: [
      { path: "/email/inbox", title: "Inbox" },
      { path: "/email/compose", title: "Compose" },
      { path: "/email/detail", title: "Detail" },
    ],
  },
  { path: "/profile", icon: "bi bi-people", title: "Profile" },
];

export default Menu;
