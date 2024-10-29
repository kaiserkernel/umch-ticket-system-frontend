const Menu = [
  { is_header: true, title: "Navigation" },
  { path: "/home", icon: "bi bi-cpu", title: "Home" },
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
